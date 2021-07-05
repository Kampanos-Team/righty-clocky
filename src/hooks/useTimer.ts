import { useEffect, useState } from "react";
import {useContext} from "react"
import toast from "react-hot-toast";
import { timerContext } from '../contexts/TimerContext';
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";
import { useTask } from "./useTask";

type Timestamp = {
  userId: string
  startTime: string
  taskId: string
  userName: string
  taskName: string
}
//Percentage formula Math.floor((time/1000*2.777777777777778*100)/100)

export function useTimer(){
  const {user} = useAuth()
  const {selectedTaskId, setTaskNotSelectedError, selectedTaskName, selectedProjectName, setSelectedTaskName, setSelectedTaskId } = useTask()
  const { isTimerOn, setIsTimerOn, formattedTime, timePercentage, setStartCounterTime, setFormattedTime, startCounterTime, setTimePercentage  } = useContext(timerContext)

  const [timestampId, setTimestampId] = useState<string | null>()

  //counter functionality
  useEffect(() => {
    let interval = null as any
    if (isTimerOn) {
      interval = setInterval(() => {
        let newInterval = Date.now() - startCounterTime
        setFormattedTime(new Date(newInterval).toISOString().substr(11, 8))
        setTimePercentage(Math.floor((newInterval/1000*2.777777777777778*100)/100))
      }, 1);
    }else if (!isTimerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[timestampId, isTimerOn, timePercentage])

  //on page load check if user has timeStamp in progress and recover it
  useEffect(() => {
    if(user?.timestampInProgress){
      const recoverTimer = async () => {
        const timestampRef = await database.ref("companies/timestamps").child(`${user.timestampInProgress}`).get()
        const timestampData:Timestamp = timestampRef.val()
        setTimestampId(user.timestampInProgress)
        setSelectedTaskName(timestampData.taskName)
        setTaskNotSelectedError(false)
        setStartCounterTime(new Date(timestampData.startTime))
        setIsTimerOn(true)
        setSelectedTaskId(timestampData.taskId)
      }
      recoverTimer()
    }
  },[user])

  const handleEndTimer = async () => {
    if(isTimerOn){
      const endTime = Date.now()
      if(!user){
        return;
      }
      await database.ref(`companies/timestamps/${timestampId}`).update({
        endTime: new Date(endTime).toString(),
        totalHours: formattedTime
        })
      // disable task in progress
      const taskRef = database.ref(`companies/tasks/${selectedTaskId}`)
      await taskRef.update({
        isInProgress: false
      })
      
      await database.ref("users").child(user.id).update({
        timestampInProgress: null
      })

      setIsTimerOn(false)
      setStartCounterTime(undefined)
      // setTimestampId(null)
      return;
    }
  }
  const handleStartTimer = async () => {
    if(isTimerOn){
      toast("Timer already started!")
      return
    }
    const startTime = Date.now()
    if(!selectedTaskId){
      return setTaskNotSelectedError(true)
    }
    if(user){
      setStartCounterTime(startTime)
      setIsTimerOn(true)
      //timestamp route
      const timestampRef = database.ref("companies/timestamps");
      const newTimestamp = await timestampRef.push({
        userId: user.id,
        startTime: new Date(startTime).toString(),
        taskId: selectedTaskId,
        taskName: selectedTaskName,
        userName: user.name,
        project: selectedProjectName,
        createdAt: Date.now()
      })
      //set task in progress
      const taskRef = database.ref(`companies/tasks/${selectedTaskId}`)
      await taskRef.update({
        isInProgress: true
      })

      await database.ref("users").child(user.id).update({
        timestampInProgress: newTimestamp.key
      })
      if(timestampRef){
        setTaskNotSelectedError(false)

        setTimestampId(newTimestamp.key)
      }
    }
    return;
  };
  
  return { isTimerOn, setIsTimerOn, formattedTime, timePercentage, setStartCounterTime, setFormattedTime, handleEndTimer, handleStartTimer}
}

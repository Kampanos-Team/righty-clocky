import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useTask } from "../hooks/useTask";
import { auth, database } from "../services/firebase";
import { authContext } from "./AuthContext";

interface TimerContextData{
  isTimerOn: boolean,
  setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>
  writeStartTime: () => Promise<void>
  writeEndTime:   () => Promise<void>
  formattedTime: string
  timePercentage: number
  setStartCounterTime: React.Dispatch<any>
  setFormattedTime: React.Dispatch<React.SetStateAction<string>>
}
interface TimerProviderProps {
  children: ReactNode;
}
type Timestamp = {
  userId: string
  startTime: string
  taskId: string
  userName: string
}

export const timerContext = createContext({} as TimerContextData);
export function TimerProvider({children} : TimerProviderProps){
  const {setSelectedTask, selectedTask, setTaskNotSelectedError, selectedProjectName} = useTask()
  const {user, signInWithGoogle} = useAuth()

  const [isTimerOn, setIsTimerOn] = useState<boolean>(false)
  const [timestampId, setTimestampId] = useState<string | null>()
  const [formattedTime, setFormattedTime] = useState<string>("")
  const [startCounterTime, setStartCounterTime] = useState<any>(0)
  const [timePercentage, setTimePercentage] = useState<number>(0)


  const writeStartTime = async () => {
    if(isTimerOn){
      toast("Timer already started!")
      return
    }
    const startTime = Date.now()
    if(!selectedTask){
      return setTaskNotSelectedError(true)
    }
    if(user){
      //timestamp route
      const timestampRef = database.ref("companies/timestamps");
      const newTimestamp = await timestampRef.push({
        userId: user.id,
        startTime: new Date(startTime).toString(),
        taskId: selectedTask,
        userName: user.name,
        project: selectedProjectName,
        createdAt: Date.now()
      })
      //set task in progress
      const taskRef = database.ref(`companies/tasks/${selectedTask}`)
      const taskUpdate = await taskRef.update({
        isInProgress: true
      })

      const userRef = await database.ref("users").child(user.id).update({
        timestampInProgress: newTimestamp.key
      })
      if(timestampRef){
        setTaskNotSelectedError(false)
        setStartCounterTime(startTime)
        setTimestampId(newTimestamp.key)
        setIsTimerOn(true)
      }

    }
    return;
  };

  useEffect(() => {
    //counter functionality
    let interval = null as any
    if (isTimerOn) {
      interval = setInterval(() => {
        let newInterval = Date.now() - startCounterTime
        setFormattedTime(new Date(newInterval).toISOString().substr(11, 8))
        //Percentage formula Math.floor((time/1000*2.777777777777778*100)/100)
        setTimePercentage(Math.floor((newInterval/1000*2.777777777777778*100)/100))
      }, 1);
    }else if (!isTimerOn) {
      clearInterval(interval);
      // setFormattedTime("")
    }
    return () => clearInterval(interval);
  },[timestampId, isTimerOn, timePercentage])

  useEffect(() => {
    if(user?.timestampInProgress){
      const recoverTimer = async () => {
        const timestampRef = await database.ref("companies/timestamps").child(`${user.timestampInProgress}`).get()
        const timestampData:Timestamp = timestampRef.val()

        setTimestampId(user.timestampInProgress)
        setTaskNotSelectedError(false)
        setStartCounterTime(new Date(timestampData.startTime))
        setIsTimerOn(true)
        setSelectedTask(timestampData.taskId)
      }
      recoverTimer()
      
    }
  },[user])

  const writeEndTime = async () => {
    const endTime = Date.now()
    if(!user){
      return;
    }
    const timestampRef = await database.ref(`companies/timestamps/${timestampId}`).update({
      endTime: new Date(endTime).toString(),
      totalHours: formattedTime
      })

    // disable tas in progress
    const taskRef = database.ref(`companies/tasks/${selectedTask}`)
    const taskUpdate = await taskRef.update({
      isInProgress: false
    })
    
    const userRef = await database.ref("users").child(user.id).update({
      timestampInProgress: null
    })

    setIsTimerOn(false)
    setStartCounterTime(undefined)
    // setTimestampId(null)
    return;
    }

  return(
    <timerContext.Provider value={{ timePercentage, setFormattedTime, formattedTime, isTimerOn, setIsTimerOn, writeStartTime, writeEndTime, setStartCounterTime}}>
      {children}
    </timerContext.Provider>
  )

}
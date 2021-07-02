import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTask } from "../hooks/useTask";
import { auth, database } from "../services/firebase";
import { authContext } from "./AuthContext";

interface TimerContextData{
  isTimerOn: boolean,
  setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>
  time:number
  writeStartTime: () => void
  writeEndTime: () => void
  formattedTime: string
  timePercentage: number
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
  const {setSelectedTask, selectedTask, setTaskNotSelectedError} = useTask()
  const {user, signInWithGoogle} = useAuth()

  const [isTimerOn, setIsTimerOn] = useState<boolean>(false)
  const [timestampId, setTimestampId] = useState<string | null>()
  const [time, setTime] = useState<number>(0)
  const [formattedTime, setFormattedTime] = useState<string>("")
  const [startCounterTime, setStartCounterTime] = useState<any>(0)
  const [timePercentage, setTimePercentage] = useState<number>(0)


  const handleTimeCounter = () => {
    //logica do timer
  }

  const writeStartTime = async () => {
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
        userName: user.name
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
  };

  useEffect(() => {
    let interval = null as any
    if (isTimerOn) {
      interval = setInterval(() => {
        let inter = Date.now() - startCounterTime
        setTime(inter)
        setFormattedTime(new Date(inter).toISOString().substr(11, 8))
        setTimePercentage((inter / 1000)/60)
        // if(timePercentage >= 100){
        //   setTimePercentage(1)
        // }
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
    }

  return(
    <timerContext.Provider value={{ timePercentage, formattedTime, isTimerOn, setIsTimerOn, writeStartTime, writeEndTime, time}}>
      {children}
    </timerContext.Provider>
  )

}
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTask } from "../hooks/useTask";
import { auth, database } from "../services/firebase";
import { authContext } from "./AuthContext";

interface TimerContextData{
  isTimerOn: boolean,
  setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>
  time:number
  timestamps : any[]
  writeStartTime: () => void
  writeEndTime: () => void
  formattedTime: string
  timePercentage: number
}
interface TimerProviderProps {
  children: ReactNode;
}
export const timerContext = createContext({} as TimerContextData);
export function TimerProvider({children} : TimerProviderProps){
  const [isTimeOn, setIsTimeOn] = useState(false);
  const [timestamps, setTimestamps] = useState<any>([])
  const [isTimerOn, setIsTimerOn] = useState<boolean>(false)
  const {user, signInWithGoogle} = useAuth()
  const {selectedTask, setTaskNotSelectedError} = useTask()
  const [timestampId, setTimestampId] = useState<string | null>()
  const [time, setTime] = useState<number>(0)
  const [formattedTime, setFormattedTime] = useState<string>("")
  const [startCounterTime, setStartCounterTime] = useState<any>()
  const [timePercentage, setTimePercentage] = useState<number>(1)


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
      //task route
      const taskRef = database.ref(`companies/tasks/${selectedTask}`)
      const taskUpdate = await taskRef.update({
        isInProgress: true
      })

      if(timestampRef){
      }
      console.log(newTimestamp.orderByValue)
      setTaskNotSelectedError(false)
      setStartCounterTime(startTime)
      setTimestampId(newTimestamp.key)
      setIsTimerOn(true)
    }
  };

  useEffect(() => {

    let interval = null as any
    if (isTimerOn) {
      interval = setInterval(() => {
        let inter = Date.now() - startCounterTime
        setTime(inter)
        setFormattedTime(new Date(inter).toISOString().substr(11, 8))
        setTimePercentage((time / 1000)*100/60)
        // if(timePercentage >= 100){
        //   setTimePercentage(1)
        // }
      }, 1);
    }
     else if (!isTimerOn) {
      //  const updateClock = async () => {
      //   const taskRef = database.ref(`companies/tasks/${selectedTask}`)
      //   const taskUpdate = await taskRef.update({
      //     isInProgress: false
      //   })
      //  }
      //  updateClock()
      clearInterval(interval);
      // setFormattedTime("")

    }
    // console.log(timer)
    return () => clearInterval(interval);
  },[timestampId, isTimerOn, timePercentage])

  const writeEndTime = async () => {
    const endTime = Date.now()
    if(!user){
      return;
    }
    const timestampRef = await database.ref(`companies/timestamps/${timestampId}`).update({
      endTime: new Date(endTime).toString(),
      totalHours: formattedTime
      })

      // task route
      const taskRef = database.ref(`companies/tasks/${selectedTask}`)
      const taskUpdate = await taskRef.update({
        isInProgress: false
      })

      setIsTimerOn(false)
      setStartCounterTime(undefined)
      // setTimestampId(null)
    }

  return(
    <timerContext.Provider value={{timestamps, timePercentage, formattedTime, isTimerOn, setIsTimerOn, writeStartTime, writeEndTime, time}}>
      {children}
    </timerContext.Provider>
  )

}
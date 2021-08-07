import { createContext, ReactNode, useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";


interface TimerContextData{
  isTimerOn: boolean,
  setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>
  formattedTime: string
  timePercentage: number
  setStartCounterTime: React.Dispatch<any>
  setFormattedTime: React.Dispatch<React.SetStateAction<string>>
  startCounterTime:any
  setTimePercentage: React.Dispatch<React.SetStateAction<number>>
  isNotificationSent: boolean
  setIsNotificationSent: React.Dispatch<React.SetStateAction<boolean>>
  timestampId: string | null | undefined
  setTimestampId: React.Dispatch<React.SetStateAction<string | null | undefined>>
}
interface TimerProviderProps {
  children: ReactNode;
}


export const timerContext = createContext({} as TimerContextData);
export function TimerProvider({children} : TimerProviderProps){

  const [isTimerOn, setIsTimerOn] = useState<boolean>(false)
  const [formattedTime, setFormattedTime] = useState<string>("")
  const [startCounterTime, setStartCounterTime] = useState<any>(0)
  const [timePercentage, setTimePercentage] = useState<number>(0)
  const [isNotificationSent, setIsNotificationSent,] = useState<boolean>(false)
  const [timestampId, setTimestampId] = useState<string | null>()



  useEffect(() => {
    Notification.requestPermission();

    if(isNotificationSent){
      sendTimerNotification()
    }

  },[isNotificationSent])
  
  const sendTimerNotification = () => {
    if (Notification.permission === "granted") {
      // new Audio("/notification.mp3").play();
      new Notification("Clocky!!!", {
        body: `Don't forget to turn off your clock when you done with work :)`,
        silent: false,
      });
    }
  }
  return(
    <timerContext.Provider value={{ 
      timePercentage, 
      setFormattedTime, 
      formattedTime, 
      isTimerOn, 
      setIsTimerOn, 
      setStartCounterTime, 
      startCounterTime,
      setTimePercentage,
      isNotificationSent, 
      setIsNotificationSent,
      timestampId, 
      setTimestampId 
      }}>
      {children}
    </timerContext.Provider>
  )

}
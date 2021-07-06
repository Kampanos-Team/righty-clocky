import { createContext, ReactNode, useState } from "react";


interface TimerContextData{
  isTimerOn: boolean,
  setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>

  formattedTime: string
  timePercentage: number
  setStartCounterTime: React.Dispatch<any>
  setFormattedTime: React.Dispatch<React.SetStateAction<string>>
  startCounterTime:any
  setTimePercentage: React.Dispatch<React.SetStateAction<number>>
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

  return(
    <timerContext.Provider value={{ timePercentage, setFormattedTime, formattedTime, isTimerOn, setIsTimerOn, setStartCounterTime, startCounterTime,setTimePercentage }}>
      {children}
    </timerContext.Provider>
  )

}
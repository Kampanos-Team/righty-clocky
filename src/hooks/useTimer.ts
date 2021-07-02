import {useContext} from "react"
import { timerContext } from '../contexts/TimerContext';


export function useTimer(){
  const {time,writeStartTime, writeEndTime, isTimerOn, setIsTimerOn, formattedTime, timePercentage, setStartCounterTime, setFormattedTime } = useContext(timerContext)
  
  return {time,writeStartTime, writeEndTime, isTimerOn, setIsTimerOn, formattedTime, timePercentage, setStartCounterTime, setFormattedTime}
}

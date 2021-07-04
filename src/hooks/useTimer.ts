import {useContext} from "react"
import { timerContext } from '../contexts/TimerContext';


export function useTimer(){
  const {writeStartTime, writeEndTime, isTimerOn, setIsTimerOn, formattedTime, timePercentage, setStartCounterTime, setFormattedTime } = useContext(timerContext)
  
  return {writeStartTime, writeEndTime, isTimerOn, setIsTimerOn, formattedTime, timePercentage, setStartCounterTime, setFormattedTime}
}

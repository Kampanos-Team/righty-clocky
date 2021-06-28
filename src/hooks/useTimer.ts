import {useContext} from "react"
import { timerContext } from '../contexts/TimerContext';


export function useAuth(){
  const {time,handleStartTimer, handlePauseTimer, isTimeOn } = useContext(timerContext)

  return {time,handleStartTimer, handlePauseTimer, isTimeOn }
}

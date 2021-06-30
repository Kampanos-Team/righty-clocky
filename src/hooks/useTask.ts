import { FormEvent } from "react";
import {useContext, useState} from "react"
import { taskContext } from '../contexts/TaskContext';
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";


export function useTask(){
  const {user} = useAuth()
  const {tasks, selectedTask, setSelectedTask, isEditTaskOpen, setIsEditTaskOpen, isNewTaskOpen, setIsNewTaskOpen,  newTaskForm, setNewTaskForm} = useContext(taskContext)
  
  const handleCloseForm =  () => {
    setNewTaskForm("")
    setIsNewTaskOpen(false)
    setIsEditTaskOpen(undefined)
  }

  
  const handleWriteNewTask = () => {
    setIsEditTaskOpen(undefined)
    setIsNewTaskOpen(!isNewTaskOpen)
  }

  return {
      tasks,
      selectedTask,
      setSelectedTask,
      isEditTaskOpen,
      setIsEditTaskOpen,
      isNewTaskOpen,
      setIsNewTaskOpen,
      newTaskForm,
      setNewTaskForm,
      handleCloseForm,
      handleWriteNewTask
  }
}

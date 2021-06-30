import {useContext, useState} from "react"
import { taskContext } from '../contexts/TaskContext';
import { database } from "../services/firebase";


export function useTask(){
  const {tasks, selectedTask, setSelectedTask, isEditTaskOpen, setIsEditTaskOpen, isNewTaskOpen, setIsNewTaskOpen,  newTaskForm, setNewTaskForm} = useContext(taskContext)

  return {
      tasks,
      selectedTask,
      setSelectedTask,
      isEditTaskOpen,
      setIsEditTaskOpen,
      isNewTaskOpen,
      setIsNewTaskOpen,
      newTaskForm,
      setNewTaskForm
  }
}

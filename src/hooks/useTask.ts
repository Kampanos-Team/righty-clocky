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
  const handleAddTask = async (event: FormEvent) => {
    event.preventDefault()
    if(!user){
      return;
    }
    if(newTaskForm.trim() === ""){
      return
    }
    if(isNewTaskOpen){
     await database.ref("companies/tasks").push({
        title: newTaskForm,
        authorId: user.id,
        isCompleted: false
      })
      handleCloseForm()
    }
  }

  const handleEditTask = async (event:FormEvent) =>{
    event.preventDefault()
    if(!user){
      return;
    }
    if(newTaskForm.trim() === ""){
      return
    }
      const taskRef = await database.ref(`companies/tasks/${isEditTaskOpen}`)
      .update({
        title: newTaskForm,
        authorId: user.id,
        isCompleted: false
      })
      handleCloseForm()
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
      handleWriteNewTask,
      handleAddTask,
      handleEditTask
  }
}

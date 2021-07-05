import { FormEvent } from "react";
import {useContext, useState} from "react"
import { taskContext } from '../contexts/TaskContext';
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";
import toast from 'react-hot-toast';


export function useTask(){
  const {user} = useAuth()
  const {
    tasks,
    selectedTask,
    setSelectedTask,
    isEditTaskOpen, 
    setIsEditTaskOpen, 
    isNewTaskOpen,
    setIsNewTaskOpen,  
    newTaskForm,
    setNewTaskForm, 
    taskNotSelectedError,
    setTaskNotSelectedError,
    projects,
    selectedProjectName,
    setSelectedProjectName
  } = useContext(taskContext)

  
  const handleCloseForm =  () => {
    setNewTaskForm("")
    setIsNewTaskOpen(false)
    setIsEditTaskOpen(undefined)
  }
  const handleOpenNewTaskForm = () => {
    setIsEditTaskOpen(undefined)
    setIsNewTaskOpen(!isNewTaskOpen)
  }
  const handleAddTask = async (event: FormEvent) => {
    let tag = ""
    projects.forEach((project) =>{
      if(project.name === selectedProjectName) tag = project.tag
    })

    event.preventDefault()
    if(!user){
      return;
    }
    if(newTaskForm.trim() === ""){
      return
    }
    if(isNewTaskOpen){
     await database.ref(`companies/tasks`).push({
        title: newTaskForm,
        projectName: selectedProjectName,
        projectTag: tag,
        authorId: user.id,
        isCompleted: false,
        isInProgress: false
      })
  
      handleCloseForm()
      toast.success("Task added",{
        duration: 4000,
        position: 'bottom-center',
        // Styling
        style: {},
        className: '',
        // Custom Icon
        // icon: '👏',
        // Change colors of success/error/loading icon
        // iconTheme: {
        //   primary: '#000',
        //   secondary: '#fff',
        // },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      })
    }
  }

  const handleEditTask = async (event:FormEvent) =>{
    event.preventDefault()
    let tag = ""
    projects.forEach((project) =>{
      if(project.name === selectedProjectName) tag = project.tag
    })
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
        isCompleted: false,
        projectName: selectedProjectName,
        projectTag: tag
      })
      handleCloseForm()
  }

  const handleCompleteTask = async () =>{
    if(!user){
      return;
    }
    const taskRef = await database.ref(`companies/tasks/${isEditTaskOpen}`)
    .update({
      isCompleted: true
    })
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
      handleOpenNewTaskForm,
      handleAddTask,
      handleEditTask,
      taskNotSelectedError,
      setTaskNotSelectedError,
      projects,
      setSelectedProjectName,
      selectedProjectName
  }
}

import { FormEvent } from "react";
import {useContext} from "react"
import { taskContext } from '../contexts/TaskContext';
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";
import toast from 'react-hot-toast';


export function useTask(){
  const {user} = useAuth()
  const {
    tasks,
    selectedTaskId,
    setSelectedTaskId,
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
    setSelectedProjectName,
    selectedTaskName, 
    setSelectedTaskName
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
        className: '',
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
      await database.ref(`companies/tasks/${isEditTaskOpen}`)
      .update({
        title: newTaskForm,
        authorId: user.id,
        isCompleted: false,
        projectName: selectedProjectName,
        projectTag: tag
      })
      handleCloseForm()
  }

  // const handleCompleteTask = async () =>{
  //   if(!user){
  //     return;
  //   }
  //   await database.ref(`companies/tasks/${isEditTaskOpen}`)
  //   .update({
  //     isCompleted: true
  //   })
  // }

  return {
      tasks,
      selectedTaskId,
      setSelectedTaskId,
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
      selectedProjectName,
      selectedTaskName, 
      setSelectedTaskName
  }
}

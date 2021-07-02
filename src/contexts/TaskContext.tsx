import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, database } from "../services/firebase";
import { authContext } from "./AuthContext";

interface TaskContextData{
  tasks: Task[]
  projects: Project[]
  selectedTask: string | undefined
  setSelectedTask: React.Dispatch<React.SetStateAction<string | undefined>>
  isEditTaskOpen: string | undefined
  setIsEditTaskOpen: React.Dispatch<React.SetStateAction<string | undefined>>
  isNewTaskOpen:boolean
  setIsNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>
  newTaskForm: string
  setNewTaskForm: React.Dispatch<React.SetStateAction<string>>
  taskNotSelectedError: boolean
  setTaskNotSelectedError: React.Dispatch<React.SetStateAction<boolean>>
}

type FirebaseTasks = Record<string, Task>

type FirebaseProjects = Record<string, Project>

interface TaskProviderProps {
  children: ReactNode;
}
type Task = {
  authorId: string
  title: string
  isCompleted: boolean
  inProgress: string
  isInProgress: boolean
}

type Project = {
  id: string
  name: string
  tag: string
}

export const taskContext = createContext({} as TaskContextData);
export function TaskProvider({children} : TaskProviderProps){
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<string | undefined>()
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<string | undefined>()
  const [isNewTaskOpen, setIsNewTaskOpen] = useState<boolean>(false)
  const [newTaskForm, setNewTaskForm] = useState<string>("")
  const [taskNotSelectedError, setTaskNotSelectedError] = useState<boolean>(false)
  const [projects, setProjects] = useState<Project[]>([])


    // fetch task data
  useEffect(() => {
    const taskRef = database.ref(`companies/tasks`)
    //listening if any info change in database
    taskRef.on("value", task => {
      const databaseTask = task.val()
      const firebaseTasks: FirebaseTasks = databaseTask ?? {}
      const parsedTasks = Object.entries(firebaseTasks).map(([key, value]) =>{
        return {
          id:key,
          authorId: value.authorId,
          isCompleted: value.isCompleted,
          title: value.title,
          inProgress: value.inProgress,
          isInProgress: value.isInProgress
        }
    })
      setTasks(parsedTasks)
    })

    const projectsRef = database.ref("companies/projects")
    projectsRef.once("value", project => {
      const projectData = project.val()
      const firebaseProjects : FirebaseProjects = projectData ?? {}
      const parsedProjects = Object.entries(firebaseProjects).map(([key, value]) =>{
        return {
          id:key,
          name: value.name,
          tag: value.tag
        }
      })
      setProjects(parsedProjects)
      console.log(parsedProjects)
    })
    
    return () => {
      taskRef.off("value")
      projectsRef.off("value")
    }
  },[])



  return(
    <taskContext.Provider value={{
      tasks,
      projects,
      taskNotSelectedError,
      setTaskNotSelectedError, 
      selectedTask, 
      setSelectedTask, 
      isEditTaskOpen, 
      setIsEditTaskOpen, 
      isNewTaskOpen, 
      setIsNewTaskOpen, 
      newTaskForm, 
      setNewTaskForm
      }}>
      {children}
    </taskContext.Provider>
  )

}
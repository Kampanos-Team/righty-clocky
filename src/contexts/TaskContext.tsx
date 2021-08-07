import { createContext, ReactNode, useEffect, useState } from "react";
import { database } from "../services/firebase";

interface TaskContextData{
  tasks: Task[]
  projects: Project[]
  selectedTaskId: string | undefined
  setSelectedTaskId: React.Dispatch<React.SetStateAction<string | undefined>>
  selectedTaskName: string | undefined 
  setSelectedTaskName: React.Dispatch<React.SetStateAction<string | undefined>>
  isEditTaskOpen: string | undefined
  setIsEditTaskOpen: React.Dispatch<React.SetStateAction<string | undefined>>
  isNewTaskOpen:boolean
  setIsNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>
  newTaskForm: string
  setNewTaskForm: React.Dispatch<React.SetStateAction<string>>
  taskNotSelectedError: boolean
  setTaskNotSelectedError: React.Dispatch<React.SetStateAction<boolean>>
  selectedProjectName: any
  setSelectedProjectName: React.Dispatch<any>
  exportData: any
  setExportData: React.Dispatch<any>
}

type FirebaseTasks = Record<string, Task>

type FirebaseProjects = Record<string, Project>

type TaskProviderProps = {
  children: ReactNode;
}

type Task = {
  authorId: string
  title: string
  isCompleted: boolean
  inProgress: string
  isInProgress: boolean
  projectName: string
  projectTag: string
  projectId :string
}

type Project = {
  id: string
  name: string
  tag: string
}

export const taskContext = createContext({} as TaskContextData);
export function TaskProvider({children} : TaskProviderProps){

  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>()
  const [selectedTaskName, setSelectedTaskName] = useState<string | undefined>()
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<string | undefined>()
  const [isNewTaskOpen, setIsNewTaskOpen] = useState<boolean>(false)
  const [newTaskForm, setNewTaskForm] = useState<string>("")
  const [taskNotSelectedError, setTaskNotSelectedError] = useState<boolean>(false)
  const [selectedProjectName, setSelectedProjectName] = useState<any>()
  const [exportData, setExportData] = useState<any>([])


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
          isInProgress: value.isInProgress,
          projectId: value.projectId,
          projectName: value.projectName,
          projectTag: value.projectTag
        }
    })
      setTasks(parsedTasks)
    })
    const projectsRef = database.ref("companies/projects")
    projectsRef.on("value", project => {
      const projectData = project.val()
      const firebaseProjects : FirebaseProjects = projectData ?? {}
      const parsedProjects = Object.entries(firebaseProjects).map(([key, value]) =>{
        return {
          id:key,
          name: value.name,
          tag: value.tag
        }
      })
      setSelectedProjectName(parsedProjects[0].name)
      setProjects(parsedProjects)
    })
    
    return () => {
      //clean event listeners
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
      selectedTaskId, 
      setSelectedTaskId, 
      isEditTaskOpen, 
      setIsEditTaskOpen, 
      isNewTaskOpen, 
      setIsNewTaskOpen, 
      newTaskForm, 
      setNewTaskForm,
      selectedProjectName,
      setSelectedProjectName,
      exportData, 
      setExportData,
      selectedTaskName, 
      setSelectedTaskName
      }}>
      {children}
    </taskContext.Provider>
  )

}
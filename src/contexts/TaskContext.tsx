import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, database } from "../services/firebase";
import { authContext } from "./AuthContext";

interface TaskContextData{
  tasks: Task[]
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

export const taskContext = createContext({} as TaskContextData);
export function TaskProvider({children} : TaskProviderProps){
  const {user, signInWithGoogle} = useContext(authContext)
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<string | undefined>()
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<string | undefined>()
  const [isNewTaskOpen, setIsNewTaskOpen] = useState<boolean>(false)
  const [newTaskForm, setNewTaskForm] = useState<string>("")
  const [taskNotSelectedError, setTaskNotSelectedError] = useState<boolean>(false)


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
      console.log(parsedTasks)
    })
    return () => {
      taskRef.off("value")
    }
  },[])
  //write task data
  const handleAddTask = async () => {
    if(!user){
      return;
    }
      const taskRef = database.ref("companies/tasks")
      const newTask = await taskRef.push({
        title: "New Task",
        authorId: user.id,
        isCompleted: false
      })
  }

  return(
    <taskContext.Provider value={{tasks, taskNotSelectedError, setTaskNotSelectedError, selectedTask, setSelectedTask, isEditTaskOpen, setIsEditTaskOpen, isNewTaskOpen, setIsNewTaskOpen, newTaskForm, setNewTaskForm}}>
      {children}
    </taskContext.Provider>
  )

}
import {useContext, useEffect } from "react"
import {authContext} from "../contexts/AuthContext"
import { taskContext } from "../contexts/TaskContext"
import { database } from "../services/firebase"
import { useTimer } from "./useTimer"

type FirebaseTimestamps = Record<string,Timestamp> 

type Timestamp = 
  {
    userId: string
    startTime:string
    endTime:string
    totalHours:string
    taskId:string
    project:string
    taskName: string
    userName: string
  }

//Query and filter data
//flat data 
//export

// FORMATTED DATA
// const headers = [
//   { label: "Name", key: "name" },
//   { label: "Start Time", key: "startTime" },
//   { label: "End Time", key: "endTime" },
//   { label: "Project", key: "project" },
//   {label: "Task", key: "task"},
//   { label: "Total Hours", key: "totalHours" },
// ];
// const data = [
//   { name: "user", startTime: "xxxx", endTime: "xxxx", project: "projectX", task: "task1", totalHours: "xxxx" }
//],

export function useExport(){
  const {user} = useContext(authContext)
  const {exportData, setExportData} = useContext(taskContext)
  const {isTimerOn} = useTimer()
  //Header for CSV
  const headers = [
    { label: "Name", key: "name" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Project", key: "project" },
    { label: "Task", key: "task"},
    { label: "Total Hours", key: "totalHours" },
  ];

  //Query Data
  //signed user 
  useEffect(() => {
    const getUserTimestamps = async () => {
      const currentDate = new Date()
      const startDate = currentDate.setMonth(currentDate.getMonth() - 1)
      if(user){
        const timestampRef = database.ref("companies/timestamps")
        const filterData = await (await timestampRef.orderByChild("createdAt").startAt(startDate).endAt(Date.now()).once("value")).val()
        console.log(filterData);
        const firebaseTimestamps: FirebaseTimestamps = filterData ?? {}
        const parsedTimestamps = Object.entries(firebaseTimestamps).map(([key, value]) =>{
          return {
            name: value.userName,
            startTime:value.startTime,
            endTime:value.endTime,
            totalHours:value.totalHours,
            task:value.taskName,
            project: value.project
          }
        })
        const filteredDataByUser = [] as Timestamp[]
         parsedTimestamps.forEach((item:any) => {
          if(item !== undefined && item.name === user.name){
            filteredDataByUser.push(item)
          }
        })
        filteredDataByUser.reverse()
        console.log(filteredDataByUser)
        if(filteredDataByUser){
          setExportData(filteredDataByUser)
        }
      }
    }
    getUserTimestamps()
  }, [user, isTimerOn, setExportData])

  //all users
  // const getAllUsersTimestamps = async () => {
  //   if(user){
  //     const timestampRef = database.ref("companies/timestamps")
  //     const filterData = await (await timestampRef.orderByChild("createdAt").once("value")).val()
  //     console.log(filterData);
  //     const firebaseTimestamps: FirebaseTimestamps = filterData ?? {}
  //     const parsedTimestamps = Object.entries(firebaseTimestamps).map(([key, value]) =>{
  //       return {
  //         name: user.name,
  //         startTime:value.startTime,
  //         endTime:value.endTime,
  //         totalHours:value.totalHours,
  //         task:value.taskName,
  //         project: value.project
  //       }
  //     })
  //     setExportData(parsedTimestamps)
  //     return; 
  //   }
  // }

  return {headers, exportData}
}

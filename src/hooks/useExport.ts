import {useContext, useState} from "react"
import {authContext} from "../contexts/AuthContext"
import { taskContext } from "../contexts/TaskContext"
import { database } from "../services/firebase"

type FirebaseTimestamps = Record<string,Timestamp> 

type Timestamp = 
  {
    userId: string
    startTime:string
    endTime:string
    totalHours:string
    taskId:string
    project?:string
  
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
//   { name: "user", startTime: "xxxx", endTime: "xxxx", project: "projectX", task: "task1", totalHours: "xxxx" },


export function useExport(){
  const {user} = useContext(authContext)
  const {exportData, setExportData} = useContext(taskContext)
  
  const headers = [
    { label: "Name", key: "name" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Project", key: "project" },
    { label: "Task", key: "task"},
    { label: "Total Hours", key: "totalHours" },
  ];
  //Query Data
  const getUserTimestamps = async () => {
    if(user){
      const timestampRef = database.ref("companies/timestamps")
      const filterData = await (await timestampRef.orderByChild("userId").equalTo(user.id).once("value")).val()
      console.log(filterData);
      const firebaseTimestamps: FirebaseTimestamps = filterData ?? {}
      const parsedTimestamps = Object.entries(firebaseTimestamps).map(([key, value]) =>{
        return {
          name: user.name,
          startTime:value.startTime,
          endTime:value.endTime,
          totalHours:value.totalHours,
          task:value.taskId,
        }
      })
      console.log(parsedTimestamps)
      // snapshot.forEach(function(data) {
      //     console.log(data.key);
      // })
      setExportData(parsedTimestamps)
      return 
    }
  }
  //format data




  //export data

  // const data = getUserTimestamps()

  return {headers, exportData, getUserTimestamps}
}

import {useContext} from "react"
import {authContext} from "../contexts/AuthContext"


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
  //Query Data

  //format data

  //export data
  const headers = [
  { label: "Name", key: "name" },
  { label: "Start Time", key: "startTime" },
  { label: "End Time", key: "endTime" },
  { label: "Project", key: "project" },
  {label: "Task", key: "task"},
  { label: "Total Hours", key: "totalHours" },
];
  const data = [
  { name: "user", startTime: "xxxx", endTime: "xxxx", project: "projectX", task: "task1", totalHours: "xxxx" }
]

  return {headers, data}
}

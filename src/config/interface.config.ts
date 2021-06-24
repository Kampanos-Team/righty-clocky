//CONFIG UNDONE

export interface Company{
  name: string,
  workers:[
    worker:Worker
  ]
  projects: [
    project: Project
  ]
}
export interface Worker{
  name: string,
  address: string
  totalHours:Date
}
export interface Project{
  name: string
  tasks: [
    task: Task
  ]
}
export interface Timer{
  startTime:Date
  endTime: Date,
  worker:Worker,
  project: Project,
  task: Task
}
export interface Task{
  name: string,

}
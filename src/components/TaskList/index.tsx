import React, { FormEvent, useContext, useEffect} from 'react';
import Task from "../Task"

import arrowImg from "../../assets/images/arrow.svg"
import playIcon from "../../assets/images/play-icon.svg"

import "./styles.scss"
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { useState } from 'react';
import { useTask } from '../../hooks/useTask';



const TaskList = () => {
  const {user} = useAuth()
  const {tasks, selectedTask, setSelectedTask, isEditTaskOpen, setIsEditTaskOpen, isNewTaskOpen, setIsNewTaskOpen, newTaskForm, setNewTaskForm } = useTask()

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
      const taskRef = await database.ref("companies/tasks").push({
        title: newTaskForm,
        authorId: user.id,
        isCompleted: false
      })
      setNewTaskForm("")
      setIsNewTaskOpen(false)
    }
  }
  console.log(newTaskForm)

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
      setNewTaskForm("")
      setIsNewTaskOpen(false)
      setIsEditTaskOpen(undefined)
  }
  return (
    <div className="task-list">
      <button className="arrow-up">
        <img src={arrowImg} alt="arrow up" />
      </button>
      <div className="task-scroll">
      {tasks.map((task:any, index:any) => (
        <Task
          key={task.id}
          taskId={task.id}
          isActive = {task.id === selectedTask}
          isCompleted = {task.isCompleted}
          title={task.title}
          taskNumber={index}
          />
      ))}
         </div>
      <button className="arrow-down"> <img src={arrowImg} alt="arrow down" /></button>
      <button onClick={handleWriteNewTask} className="add-task">add task</button>
      {isNewTaskOpen && !isEditTaskOpen && (
        <form onSubmit={(event) => handleAddTask(event)}>
        <div>
          <input
          type="text"
          placeholder="write your task here :)"
          value={newTaskForm}
          onChange={event => setNewTaskForm(event.target.value)}
            />
          <span onClick={() => setNewTaskForm("")}>X</span>
        </div>
        <button type="submit" className={`${newTaskForm ? "display" : "hide"}`}>
          <img src={playIcon} alt="add task" />
        </button>
        </form>
      )}
      {!isNewTaskOpen && isEditTaskOpen && (
        <form onSubmit={(event) => handleEditTask(event)}>
        <div>
          <input
          type="text"
          placeholder="write your task here :)"
          value={newTaskForm}
          onChange={event => setNewTaskForm(event.target.value)}
            />
          <span onClick={() => setNewTaskForm("")}>X</span>
        </div>
        <button type="submit" className={`${newTaskForm ? "display" : "hide"}`}>
          <img src={playIcon} alt="add task" />
        </button>
        </form>
      )}
      
    </div>
  );
}
export default TaskList;
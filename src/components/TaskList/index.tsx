import Task from "../Task"
// import * as Scroll from 'react-scroll'
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import arrowImg from "../../assets/images/arrow.svg"
import playIcon from "../../assets/images/play-icon.svg"
import Select from 'react-select';

import "./styles.scss"
import { useAuth } from '../../hooks/useAuth';
import { useTask } from '../../hooks/useTask';
import { useState } from "react";
import { useEffect } from "react";

const TaskList = () => {
  const {user} = useAuth()
  const {
      tasks,
      selectedTask,
      isEditTaskOpen,
      isNewTaskOpen, newTaskForm,
      setNewTaskForm, 
      handleCloseForm, 
      handleOpenNewTaskForm, 
      handleAddTask, 
      handleEditTask,
      taskNotSelectedError,
      projects,
      setSelectedProjectName,
      selectedProjectName
     } = useTask()
    const [value, setValue] = useState<any>()
    const handleFormSelector = (event: any) => {
      const parsedSelection = JSON.parse(event.target.value)
      console.log(parsedSelection.name)
      setSelectedProjectName(parsedSelection.name)
    }

  return (
    <div className="task-list">
      <div className="info">
        <span className={`${taskNotSelectedError && "error"}`}>1. Select One Task</span>
      </div>
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
          taskNumber={task.tag}
          isInProgress ={task.isInProgress}
          projectName={task.projectName}
          />
      ))}
         </div>
        <button
 
        className="arrow-down">
          <img src={arrowImg} alt="arrow down"/>
        </button>
      {!isNewTaskOpen && !isEditTaskOpen && (
        <button onClick={handleOpenNewTaskForm} className="add-task">add task</button>
      )}
      {isNewTaskOpen && !isEditTaskOpen && (
        <form onSubmit={(event) => handleAddTask(event)}>
        <div>
        <select value={selectedProjectName} onChange={(event) => setSelectedProjectName(event.target.value)}>
            {projects.map((project => (
              <option key={project.id} value={project.name}>
              #{project.tag}
              </option>
            ))) 
            }
          </select>
          <input
          autoFocus
          type="text"
          placeholder="write your task here :)"
          value={newTaskForm}
          onChange={event => setNewTaskForm(event.target.value)}
            />
          <span onClick={handleCloseForm}>X</span>
        </div>
        <button type="submit" className={`${newTaskForm ? "display" : "hide"}`}>
          <img src={playIcon} alt="add task" />
        </button>
        </form>
      )}
      {!isNewTaskOpen && isEditTaskOpen && (
        <form onSubmit={(event) => handleEditTask(event)}>
        <div>
          <select value={selectedProjectName} onChange={(event) => setSelectedProjectName(event.target.value)} >
          {projects.map((project => {
            return(
              <option  key={project.id} value={project.name}>
              #{project.tag}
              </option>
            )
            }
          )) 
          }
        </select>

          <input
          autoFocus
          type="text"
          placeholder="write your task here :)"
          value={newTaskForm}
          onChange={event => setNewTaskForm(event.target.value)}
            />
          <span onClick={handleCloseForm}>X</span>
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
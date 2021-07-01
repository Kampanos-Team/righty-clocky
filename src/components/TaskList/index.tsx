import Task from "../Task"
// import * as Scroll from 'react-scroll'
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import arrowImg from "../../assets/images/arrow.svg"
import playIcon from "../../assets/images/play-icon.svg"

import "./styles.scss"
import { useAuth } from '../../hooks/useAuth';
import { useTask } from '../../hooks/useTask';

const TaskList = () => {
  const {user} = useAuth()
  const {
      tasks,
      selectedTask,
      isEditTaskOpen,
      isNewTaskOpen, newTaskForm,
      setNewTaskForm, 
      handleCloseForm, 
      handleWriteNewTask, 
      handleAddTask, 
      handleEditTask
     } = useTask()

  return (
    <div className="task-list">
      <div className="info">
        <span>1. Select One Task</span>
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
          taskNumber={index}
          />
      ))}
         </div>
        <button
 
        className="arrow-down">
          <img src={arrowImg} alt="arrow down"/>
        </button>
      {!isNewTaskOpen && !isEditTaskOpen && (
        <button onClick={handleWriteNewTask} className="add-task">add task</button>
      )}
      {isNewTaskOpen && !isEditTaskOpen && (
        <form onSubmit={(event) => handleAddTask(event)}>
        <div>
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
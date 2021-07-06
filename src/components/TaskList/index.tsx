import Task from "../Task"

import arrowImg from "../../assets/images/arrow.svg"
import playIcon from "../../assets/images/play-icon.svg"

import "./styles.scss"
import { useTask } from '../../hooks/useTask';

const TaskList = () => {
  const {
      tasks,
      selectedTaskId,
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

  return (
    <div className="task-list">
      <div className="info">
        <span className={`${taskNotSelectedError && "error"}`}>1. Select One Task</span>
      </div>
      <button className="arrow-up">
        <img src={arrowImg} alt="arrow up" />
      </button>
      <div className="task-scroll">
      {tasks.map((task:any) => (
        <Task
          key={task.id}
          taskId={task.id}
          isActive = {task.id === selectedTaskId}
          isCompleted = {task.isCompleted}
          title={task.title}
          projectTag={task.projectTag}
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
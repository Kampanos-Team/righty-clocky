import React, { useContext} from 'react';
import { useState } from 'react';
import { timerContext } from '../../contexts/TimerContext';
import { useAuth } from '../../hooks/useAuth';
import Collapse from "@kunukn/react-collapse";

import closeImg from "../../assets/images/close_small.svg"
import editImg from "../../assets/images/edit.svg"
import checkImg from "../../assets/images/check.svg"

import "./styles.scss"
import { useTask } from '../../hooks/useTask';
import { database } from '../../services/firebase';

type TaskProps = {
  isActive: boolean,
  title: string,
  taskNumber: number
  taskId: string
  isCompleted: boolean
}

const Task = ({isActive = false, title , taskNumber , taskId, isCompleted}: TaskProps) => {
  const {time,handlePauseTimer, isTimeOn } = useContext(timerContext)
  const {user, signInWithGoogle} = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const {setSelectedTask, selectedTask, isEditTaskOpen, setIsEditTaskOpen, setIsNewTaskOpen, newTaskForm, setNewTaskForm} = useTask()

  const handleCompleteTask = async () =>{
    if(window.confirm("Complete this task?")){
      await database.ref(`companies/tasks/${taskId}`).update({
        isCompleted: true
      })
    }
  }
  const handleEditTask = () => {
    setNewTaskForm(title)
    setIsEditTaskOpen(taskId)
    setIsNewTaskOpen(false)
  }
  const handleDeleteTask = async () => {
    if(window.confirm("Are you sure you want to delete this task?")){
      await database.ref(`companies/tasks/${taskId}`).remove()
    }
  }

  const percentage = 30;
  return (
          
    <div className="task">
        <div className="task-card">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>...</button>
          <div onClick={() => setSelectedTask(taskId)}>
            <p><strong>Task #{taskNumber}</strong> - {title}</p>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM1.81766 9C1.81766 12.9667 5.0333 16.1823 9 16.1823C12.9667 16.1823 16.1823 12.9667 16.1823 9C16.1823 5.0333 12.9667 1.81766 9 1.81766C5.0333 1.81766 1.81766 5.0333 1.81766 9Z" fill="#5F4F87"/>
              {isActive && (<circle cx="9" cy="9" r="4" fill="#5F4F87"/>)}
            </svg>
          </div>
          
      </div>
      <Collapse 
       isOpen={isDropdownOpen}
       className={"collapsible"}
       transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)"
       aria-hidden={isDropdownOpen ? "false" : "true"}
        render={collapseState => (
            <div className={`tools`}>
              <div>
                <button onClick={handleCompleteTask}>
                  <span>
                  <img src={checkImg} alt="done" />
                    done</span>
                </button>

                <button onClick={handleEditTask}>
                <span>
                <img src={editImg} alt="edit" />
                  edit</span>
                </button>

                <button onClick={handleDeleteTask}>
                  <span>
                    <img src={closeImg} alt="delete" />
                    delete
                  </span>
                </button>
              </div>
           </div>
        )}
      />
    
      {/* </Collapse> */}
    </div>
  );
}
export default Task;
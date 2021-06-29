import React, { useContext} from 'react';
import Task from "../Task"

import arrowImg from "../../assets/images/arrow.svg"

import "./styles.scss"


const TaskList: React.FC = () => {

  const percentage = 30;
  return (
    <div className="task-list">
      <button className="arrow-up">
        <img src={arrowImg} alt="arrow up" />
      </button>
      <Task isActive = {true}/>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
      <button className="arrow-down"> <img src={arrowImg} alt="arrow down" /></button>
      <button className="add-task">add task</button>
    </div>
  );
}
export default TaskList;
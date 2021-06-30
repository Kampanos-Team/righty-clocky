import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Collapse from "@kunukn/react-collapse";
import avatar from "../../assets/images/avatar.svg"

import "./styles.scss"
import { useTask } from '../../hooks/useTask';
import ellipsisIcon from "../../assets/images/ellipsis-icon.svg"

type TaskProps = {
  isActive: boolean,
  title: string,
  taskNumber: number
  taskId: string
  isCompleted: boolean
}

const ProfileButton = () => {
  const {user} = useAuth()
  const {handleWriteNewTask} = useTask()
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)

  return (
    <div className="profile-button">
    <button >
    {user?.avatar ? (
        <img className="avatar" src={user?.avatar} alt="avatar" />
      ):(
        <img src={avatar} alt="avatar" />
      )}
      <span>name</span>
      <img onClick={() => setIsProfileOpen(!isProfileOpen)} className={`expand-img ${isProfileOpen && "open"}`} src={ellipsisIcon} alt="more" />
    </button>
    <Collapse
      isOpen={isProfileOpen}
      className="collapsible"
      transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)"
      aria-hidden={isProfileOpen ? "false" : "true"}
      render={collapseState => (
        <div className="profile-dropdown">
          <div>working</div>
          <div>export data</div>
          <div>sign out</div>
        </div>
      )}
    />
    </div>
  );
}
export default ProfileButton;
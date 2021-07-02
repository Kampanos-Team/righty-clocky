import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Collapse from "@kunukn/react-collapse";
import avatar from "../../assets/images/avatar.svg"

import "./styles.scss"
import { useTask } from '../../hooks/useTask';
import ellipsisIcon from "../../assets/images/ellipsis-icon.svg"
import { useHistory } from 'react-router-dom';
import { useTimer } from '../../hooks/useTimer';

const ProfileButton = () => {
  const history = useHistory()

  const {user, handleSignOut} = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)
  const {writeEndTime,setStartCounterTime,setFormattedTime  } = useTimer()

  const signOut = async () => {
    await writeEndTime()
    setStartCounterTime(0)
    setFormattedTime("")
    await handleSignOut() 
    history.push("/")
  }

  return (
    <div className="profile-button" >
    <button className={`${isProfileOpen && "active"}`} onClick={() => setIsProfileOpen(!isProfileOpen)}>
    {user?.avatar ? (
        <img className="avatar" src={avatar} alt="avatar" />
      ):(
        <img className="avatar" src={avatar} alt="avatar" />
      )}
      <span>
        {user?.name ? user?.name.split(" ")[0] : "Profile"}
      </span>
      <img className={`expand-img ${isProfileOpen && "open"}`} src={ellipsisIcon} alt="more" />
    </button>
    <Collapse
      isOpen={isProfileOpen}
      className="collapsible"
      transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)"
      aria-hidden={isProfileOpen ? "false" : "true"}
      render={collapseState => (
        <div className="profile-dropdown">
          <div className="selector">
          <label className="switch">
            <input type="checkbox"/>
              <span className="slider round"></span>
          </label>
            <span>Working</span>
          </div>
          <div>Export data</div>
          <div onClick={signOut}>Sign Out</div>
        </div>
      )}
    />
    </div>
  );
}
export default ProfileButton;
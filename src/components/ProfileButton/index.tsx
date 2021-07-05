import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Collapse from "@kunukn/react-collapse";
import avatar from "../../assets/images/avatar.svg"
import { CSVLink } from "react-csv";

import "./styles.scss"
import { useTask } from '../../hooks/useTask';
import ellipsisIcon from "../../assets/images/ellipsis-icon.svg"
import { useHistory } from 'react-router-dom';
import { useTimer } from '../../hooks/useTimer';
import { useExport } from '../../hooks/useExport';

const ProfileButton = () => {
  const {headers, exportData, getUserTimestamps} = useExport()
  const history = useHistory()
  const {writeEndTime,setStartCounterTime,setFormattedTime  } = useTimer()
  const {user, handleSignOut} = useAuth()

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)


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
          <div>
            <CSVLink data={exportData} headers={headers} asyncOnClick={true} onClick={(event, done) => {
              getUserTimestamps().then(() => {
                done() // REQUIRED to invoke the logic of component
              })
            }}>
            Export data
            </CSVLink>
            </div>
          <div onClick={signOut}>Sign Out</div>
        </div>
      )}
    />
    </div>
  );
}
export default ProfileButton;
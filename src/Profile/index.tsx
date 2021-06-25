import React, { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

import "./styles.css";


const Profile: React.FC = () => {
  const {user, handleSignOut} = useContext(authContext)

  return (
    <div className="profileContainer">
      {user && (
        <>
          <div className="avatarWrapper">
            <img src={user.avatar} alt="" />
          </div>
          <div>
            <strong>{user.name}</strong>
            <button onClick={handleSignOut}>log out</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

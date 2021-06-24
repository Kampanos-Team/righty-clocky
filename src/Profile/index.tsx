import React, { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

import "./styles.css";


const Profile: React.FC = () => {
  const {user} = useContext(authContext)

  return (
    <div className="profileContainer">
      {user && (
        <>
          <div className="avatarWrapper">
            <img src={user.avatar} alt="" />
          </div>
          <div>
            <strong>{user.name}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

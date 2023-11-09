import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft: "auto", marginRight: "auto", marginTop: "10rem", marginBottom: "4rem", width: "45rem", borderRadius: "50%", height: "15rem", paddingTop: "2rem", fontSize: "2rem", alignItems: "center", backgroundColor: "lightcoral", position: "relative", top: "0rem" }}
    >
      <h1><b>Username</b> : {user.name}</h1>
      <h1><b>Email</b> : {user.email}</h1>
      <h1><b>Age</b> : {user.age}</h1>
    </div>
  )
}

export default Profile;
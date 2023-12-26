import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthContext'
import { viewprofile } from '../../ApiManager/Apihandle';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [auth] = useAuth()
  const [user, setuser] = useState({});
  const fetchuserdetails = async () => {
    try {
      const response = await viewprofile(auth?.user?._id)
      setuser(response?.data?.finddata)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchuserdetails();
  }, [auth?.user?._id])
  return (
    <>
      <div id='sectiondesign'>
        <div style={{ marginTop: "50px" }}>
          <div class="user-card">
            <img src="https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="John" style={{ width: "150px", height: "150px" }} />
            <h1>{user?.name}</h1>
            <p class="user-title">{user?.email}</p>
            <p>{user?.phone}</p>
            <p>{user?.address}</p>
            <div style={{ margin: "24px 0", display: "flex", justifyContent: "space-evenly" }}>
              <a ><i class="bi bi-whatsapp" id='design' style={{ color: "green" }}></i></a>
              <a ><i class="bi bi-twitter" id='design' style={{ color: "black" }}></i></a>
              <a ><i class="bi bi-linkedin" id='design' style={{ color: "blue" }}></i></a>
              <a ><i class="bi bi-facebook" id='design' style={{ color: "blue" }}></i></a>
            </div>
            <p><Link to='/UpdateProfile' class="contact-btn" style={{ textDecoration: "none", color: "black" }}>Update Profile</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
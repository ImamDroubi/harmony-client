import React, { useEffect, useRef, useState } from 'react'
import "./edit-profile.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import ButtonStrong from '../../buttons/button-strong/ButtonStrong';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons';
import person1 from '../../../assets/images/person1.jpg';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
export default function EditProfile() {
  const {currentUser} = useAuth();
  const [username,setUserName] = useState();
  const [email,setEmail] = useState();
  useEffect(()=>{
    setUserName(currentUser?.username)
    setEmail(currentUser?.email);
  },[currentUser])
  if(!currentUser){
    return <Navigate to="/" replace />
  }
  return (
    <div className='edit-profile'>
      <ContainerWide>
        <div className="card">
          <div className="left">
            <div className="info">
              <div className="picture">
                <img src={person1} />
              </div>
              <h2 className='name'>John Doe</h2>
              <p className='followers'>55 followers</p>
            </div>
          </div>
          <div className="right">
                <div className="title">
                  <h2>Personal Information</h2>
                </div>
                <form action="">
                  <div className="form-field">
                    <FontAwesomeIcon icon={faUser} size="sm"/>
                    <label>Username:</label>
                    <input value={username} type="text" />
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <label>Email Address:</label>
                    <input value={email} type="email" />
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faKey} />
                    <label>New Password:</label>
                    <input  type="password" />
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faKey} />
                    <label>Repeat New Password:</label>
                    <input  type="password" />
                  </div>
                  <input type="submit" value="Submit" />
                </form>
                {/* <p>Already have an account? <span><Link to={"/login"}>Sign in</Link></span></p> */}
              </div>
        </div>
      </ContainerWide>
    </div>
  )
}

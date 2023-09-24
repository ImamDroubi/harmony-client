import React, { useEffect } from 'react'
import "./sign-in.scss";
import Topbar from '../../other/topbar/Topbar';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import ButtonBack from '../../buttons/button-back/ButtonBack';
import person1 from "../../../assets/images/person1_small.jpg";
import OverlayDark from '../../overlays/black/OverlayDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export default function SignIn() {
  // redirect if logged in 
  
  return (
    <div className='sign-in'>
      {/* <Topbar showAuth = {false}/> */}
        <ContainerWide>
          {/* <ButtonBack/> */}
          <div className="content">
            <div className="form-container">
              <div className="left">
                  <div className="title">
                    <h2>Sign In</h2>
                  </div>
                  <form action="">
                    <div className="form-field">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <label>Email Address:</label>
                      <input type="email" />
                    </div>
                    <div className="form-field">
                      <FontAwesomeIcon icon={faKey} />
                      <label>Password:</label>
                      <input type="password" />
                    </div>
                    <input type="submit" value="Sign in" />
                  </form>
                  <p>Need an account? <span><Link to={"/register"}>Sign up</Link></span></p>
              </div>
              <div className="right" style={{backgroundImage : `url(${person1}`}}>
                <OverlayDark />
              </div>
            </div>
          </div>
        </ContainerWide>
    </div>
  )
}

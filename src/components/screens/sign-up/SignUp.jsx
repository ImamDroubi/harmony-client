import React, { useRef } from 'react'
import "./sign-up.scss";
import Topbar from '../../other/topbar/Topbar';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import ButtonBack from '../../buttons/button-back/ButtonBack';
import person2 from "../../../assets/images/person2.jpg";
import OverlayDark from '../../overlays/black/OverlayDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function SignUp() {
  // redirect if logged in 
  const useNameRef = useRef();
  const EmailRef = useRef();
  const PasswordRef = useRef();
  return (
    <div className='sign-up'>
      {/* <Topbar showAuth = {false}/> */}
        <ContainerWide>
          {/* <ButtonBack/> */}
          <div className="content">
            <div className="form-container">
              <div className="left" style={{backgroundImage : `url(${person2}`}}>
                <OverlayDark />
              </div>
              <div className="right">
                <div className="title">
                  <h2>Sign Up</h2>
                </div>
                <form action="">
                  <div className="form-field">
                    <FontAwesomeIcon icon={faUser} size="sm"/>
                    <label>Username:</label>
                    <input ref={useNameRef} type="text" />
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <label>Email Address:</label>
                    <input ref={EmailRef} type="email" />
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faKey} />
                    <label>Password:</label>
                    <input ref={PasswordRef} type="password" />
                  </div>
                  <div className="form-field">
                    <FontAwesomeIcon icon={faKey} />
                    <label>Repeat Password:</label>
                    <input type="password" />
                  </div>
                  <input type="submit" value="Sign up" />
                </form>
                <p>Already have an account? <span><Link to={"/login"}>Sign in</Link></span></p>
              </div>
            </div>
          </div>
        </ContainerWide>
    </div>
  )
}

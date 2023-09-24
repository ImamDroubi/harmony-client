import React from 'react'
import "./auth-buttons.scss";
import { useAuth } from '../../../contexts/AuthContext';
import ButtonStrong from '../../buttons/button-strong/ButtonStrong';
import { Link } from 'react-router-dom';
export default function AuthButtons() {
  const {login} = useAuth();
  const handleLogin = ()=>{
    login();
  }
  return (
    <div className="auth-buttons">
      <a onClick={handleLogin}>Sign in</a>
      {/* <Link to={"/login"}>Sign in</Link> */}
      <Link to={"/register"}>Join Now</Link>
      
    </div>
  )
}

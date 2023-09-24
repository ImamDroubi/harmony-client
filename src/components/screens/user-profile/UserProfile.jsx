import React from 'react'
import "./user-profile.scss";
import Sidebar from '../../menus/sidebar/Sidebar';
import UserSide from '../../other/user-side/UserSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import Toggle from '../../other/toggle/Toggle';
export default function UserProfile() {
  return (
    <div className='user-profile'>
      <UserSide/>
      <div className="content">
        <ContainerWide>
          <header>
            <div className="top">
              <h2>John Doe's Profile</h2>
              <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" />
              </div>
            </div>
            <div className="description">
              <p>Listen to what <span>John Doe</span> has published</p>
              <Toggle/>
            </div>
          </header>
          <div className="combinations">
            
          </div>
          
        </ContainerWide>
      </div>
    </div>
  )
}

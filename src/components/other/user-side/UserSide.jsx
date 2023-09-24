import React from 'react'
import "./user-side.scss";
import person1 from "../../../assets/images/person1.jpg";
import ButtonStrong from '../../buttons/button-strong/ButtonStrong';
export default function UserSide() {
  return (
    <div className='user-side'>
      <div className="info">
        <div className="picture">
          <img src={person1} />
        </div>
        <div className="details">
          <h2 className='name'>John Doe</h2>
          <p className='followers'>55 followers</p>
          <ButtonStrong text={"Follow"}/>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import "./toggle.scss";
export default function Toggle() {
  const [active,setActive] = useState(false);
  const handleActivate = ()=>{
    setActive(prev=>!prev);
  }
  const activeStyleToggle = {
    "justifyContent" : "flex-end",
    "backgroundColor" : "#5dbcbc"
  }
  const activeStyleCircle = {
    "backgroundColor" : "#fff"
  }
  return (
    <div onClick={handleActivate} style={active?activeStyleToggle:null} className='toggle'>
      <div style={active?activeStyleCircle:null} className="circle"></div>
    </div>
  )
}

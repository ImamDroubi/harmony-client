import React, { useEffect, useState } from 'react'
import "./edit-track.scss";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faUpload} from '@fortawesome/free-solid-svg-icons';
import OverlayDark from '../../overlays/black/OverlayDark';
export default function EditTrack({openPopup,track}) {
  const [trackName,setTrackName] = useState();
  const [trackCategory,setTrackCategory]= useState();
  const [trackImage,setTrackImage] = useState();
  const handleNameChange = (e)=>{
    setTrackName(e.target.value);
  }
  const handleCategoryChange = (e)=>{
    setTrackCategory(e.target.value);
  }

  useEffect(()=>{
    setTrackName(track?.title);
    setTrackCategory(track?.category);
    setTrackImage(track?.img);
  },[track])
  return (
    <PopupLayout>
      <div className="popup-upload-track">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Edit Track</h2>
        </div>
        <form action="">
          <div className="form-field">
            <label>Track Name:</label>
            <input onChange={(e)=>handleNameChange(e)} value={trackName} type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input onChange={(e)=>handleCategoryChange(e)} value={trackCategory} type="text" />
          </div>
          <div className="form-field">
            <label>Track Image:</label>
            <div className="photo">
              <button>Upload</button>
              <div className="preview">
                <img src={trackImage} alt="" />
                <OverlayDark/>
              </div>
              
              {/* <input type="file" name="" id="" /> */}
            </div>
          </div>
          <input type="submit" value="Save Track" />
        </form>
      </div>
    </PopupLayout>
  )
}

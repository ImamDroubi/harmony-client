import React from 'react'
import "./upload-track.scss";
import OverlayDark from '../../overlays/black/OverlayDark';
import track from "../../../assets/images/track.jpg";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faUpload} from '@fortawesome/free-solid-svg-icons';
export default function UploadTrack({openPopup}) {
  return (
    <PopupLayout>
      <div className="popup-upload-track">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Upload A New Track</h2>
        </div>
        <form action="">
        <div className="file-field">
            <label>Track: </label>
            <button><FontAwesomeIcon icon={faUpload} /> Upload</button>
            {/* <div className="progress">
            </div> */}
          </div>
          <div className="form-field">
            <label>Track Name:</label>
            <input placeholder='Ocean, Birds, etc...' type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input placeholder='Animals, Nature, etc...' type="text" />
          </div>

          <div className="form-field">
            <label>Track Image:</label>
            <div className="photo">
              <button>Upload</button>
              <div className="preview">
                <img src={track} alt="" />
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

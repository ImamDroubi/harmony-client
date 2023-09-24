import React from 'react'
import "./save-combination.scss";
import OverlayDark from '../../overlays/black/OverlayDark';
import track from "../../../assets/images/track.jpg";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
export default function SaveCombination({openPopup}) {
  return (
    <PopupLayout>
      <div className="popup-save-combination">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Save Combination</h2>
        </div>
        <form action="">
          <div className="form-field">
            <label>Combination Name:</label>
            <input placeholder='eg.Kids Story' type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input placeholder='eg.Sleep' type="text" />
          </div>
          <div className="form-field">
            <label>Combination Image:</label>
            <div className="photo">
              <button>Upload</button>
              <div className="preview">
                <img src={track} alt="" />
                <OverlayDark/>
              </div>
              
              {/* <input type="file" name="" id="" /> */}
            </div>
            <div className="progress">

            </div>
          </div>
          
          <input type="submit" value="Save Combination" />
        </form>
      </div>
    </PopupLayout>
  )
}

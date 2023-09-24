import React, { useEffect, useState } from 'react'
import "./edit-combination.scss";
import OverlayDark from '../../overlays/black/OverlayDark';
import track from "../../../assets/images/track.jpg";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
export default function EditCombination({openPopup,combination}) {
  const [combinationName,setCombinationName] = useState();
  const [combinationCategory,setCombinationCategory] = useState();
  const [combinationImage,setCombinationImage] = useState();

  const handleNameChange = (e)=>{
    setCombinationName(e.target.value);
  }
  const handleCategoryChange = (e)=>{
    setCombinationCategory(e.target.value);
  }

  useEffect(()=>{
    setCombinationName(combination?.name);
    setCombinationCategory(combination?.category);
    setCombinationImage(combination?.photo);
  },[combination]);
  return (
    <PopupLayout>
      <div className="popup-save-combination">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Edit Combination</h2>
        </div>
        <form action="">
          <div className="form-field">
            <label>Combination Name:</label>
            <input onChange={(e)=>handleNameChange(e)} value={combinationName} type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input onChange={(e)=>handleCategoryChange(e)} value={combinationCategory} type="text" />
          </div>
          <div className="form-field">
            <label>Combination Image:</label>
            <div className="photo">
              <button>Upload</button>
              <div className="preview">
                <img src={combinationImage} alt="" />
                <OverlayDark/>
              </div>
              
              {/* <input type="file" name="" id="" /> */}
            </div>
            {/* <div className="progress">

            </div> */}
          </div>
          
          <input type="submit" value="Save Combination" />
        </form>
      </div>
    </PopupLayout>
  )
}

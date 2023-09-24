import React, { useEffect, useState } from 'react'
import "./add-to-mixing-zone.scss";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faMagnifyingGlass,faUpload} from '@fortawesome/free-solid-svg-icons';
import CustomSelect from "../../menus/custom-select/CustomSelect";
import track from "../../../assets/images/track.jpg";
import ocean from "../../../assets/images/ocean.jpg";
import birds from "../../../assets/images/birds.jpg";
import campfire from "../../../assets/images/campfire.jpg";
import waterfall from "../../../assets/images/waterfall.jpg";
import thunder from "../../../assets/images/thunder.jpg";
import rain from "../../../assets/images/rain.jpg";
import ocean_s from "../../../assets/sounds/ocean.mp3";
import birds_s from "../../../assets/sounds/birds.mp3";
import campfire_s from "../../../assets/sounds/campfire.mp3";
import waterfall_s from "../../../assets/sounds/waterfall.mp3";
import thunder_s from "../../../assets/sounds/thunder.mp3";
import rain_s from "../../../assets/sounds/rain.mp3";
import Track from '../../cards/track/Track';
import OverlayDark from '../../overlays/black/OverlayDark';
export default function AddToMixingZone({openPopup}) {
  const [currentOption,setCurrentOption] = useState(1);// add from tracks => 1 , add from computer =>2
  const [categories,setCategories] = useState([]);
  const [currentCategory,setCurrentCategory] = useState();
  const [selectedTracks, setSelectedTracks] = useState([]);
  const handleSelectTrack = (id)=>{
    if(!selectedTracks.includes(id)){
      setSelectedTracks(prev=>[...prev,id]);
    }else{
      setSelectedTracks(prev=>prev.filter(item=>{
        return item!==id;
      }));
    }
  }
  const sounds = [
    {
      "id" : "abc1234",
      "title" : "Ocean",
      "sound" : ocean_s,
      "img" : ocean,
      "volume" : 50,
      "repeat" : true,
      "mute" : false,
      "category" : "Nature"
    },
    {
      "id" : "abc1235",
      "title" : "Birds",
      "sound" : birds_s,
      "img" : birds,
      "volume" : 50,
      "repeat" : true,
      "mute" : false,
      "category" : "Animals"
    },
    {
      "id" : "abc1236",
      "title" : "Campfire",
      "sound" : campfire_s,
      "img" : campfire,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1237",
      "title" : "Thunder",
      "sound" : thunder_s,
      "img" : thunder,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1238",
      "title" : "Waterfall",
      "sound" : waterfall_s,
      "img" : waterfall,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1239",
      "title" : "Rain",
      "sound" : rain_s,
      "img" : rain,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    
    
  ]
  const userCategories = [
    "Animals", "Nature" , "Night"
  ]
  return (
    <PopupLayout>
      <div className="popup-add-to-mixing-zone">
        <button className='close' onClick={()=>openPopup(false)} ><FontAwesomeIcon icon={faXmark} /></button>
        <div className="title">
          <h2>Add To Mixing Zone</h2>
        </div>
        <div className="slider">
          <div onClick={()=>setCurrentOption(1)} className={currentOption === 1 ? "left selected" : "left"}>From Your Tracks</div>
          <div onClick={()=>setCurrentOption(2)} className={currentOption === 2 ? "right selected" : "right"}>From Your PC</div>
        </div>
        {currentOption === 1?
        <>
        <div className="filters">
          <div className="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input placeholder='Search' type="text" />
          </div>
          <div className="category">
            <p>Category:</p>
            <CustomSelect list={userCategories} setCurrentCategory={setCurrentCategory}/>
          </div>
        </div>
        <div className="tracks-header">
          <h3>Your Tracks</h3>
          {selectedTracks.length> 0 && <p>{selectedTracks.length} Tracks selected</p>}
        </div>
        <div className="tracks">
          {sounds.map((track,ind)=>{
            return <>
              {(!currentCategory || currentCategory === 'All' || currentCategory === track.category )?
                <div onClick={()=>handleSelectTrack(track.id)}  className={!selectedTracks.includes(track.id)? "block" : "block selected"}>
                <Track key={track.id} track={track}/>
              </div>
              :
              null
              }
            </>
          })}
        </div>
        <div className="buttons">
          <button onClick={()=>openPopup(false)}>Cancel</button>
          <button>Add Tracks</button>
        </div>
        </>
        :
        <form className='form' action="">
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
        }
      </div>
    </PopupLayout>
  )
}

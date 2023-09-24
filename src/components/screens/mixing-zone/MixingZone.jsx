import React, { useEffect, useState } from 'react'
import "./mixing-zone.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass}from '@fortawesome/free-solid-svg-icons';
import ContainerWide from '../../containers/container-wide/ContainerWide';
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
import ButtonBack from '../../buttons/button-back/ButtonBack';
import TrackFlexible from '../../cards/track-flexible/TrackFlexible';
import MixingControls from '../../menus/mixing-controls/MixingControls';
import AddToMixingZone from '../../popups/add-to-mixing-zone/AddToMixingZone';
import SaveCombination from '../../popups/save-combination/SaveCombination';
import Warning from '../../popups/warning/Warning';
export default function MixingZone() {
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted,setIsMuted] = useState(false);
  const [showAddTrackPopup,setShowAddTrackPopup] = useState(false);
  const [showSaveCombinationPopup,setShowSaveCombinationPopup] = useState(false);
  const [showWarningPopup,setShowWarningPopup] = useState(false);
  const sounds = [
    {
      "id" : "abc1234",
      "title" : "Ocean",
      "sound" : ocean_s,
      "img" : ocean,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1235",
      "title" : "Birds",
      "sound" : birds_s,
      "img" : birds,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
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
  const [tracks , setTracks] = useState(sounds);
  
  const playAll = ()=>{
    tracks.map((track)=>{
      document.getElementById(`sound${track.id}`).play();
    })
    setIsPaused(false);
  }
  const pauseAll = ()=>{
    tracks.map((track)=>{
      document.getElementById(`sound${track.id}`).pause();
    })
    setIsPaused(true);
  }
  const muteAll = ()=>{
    tracks.map((track)=>{
      document.getElementById(`sound${track.id}`).muted = true;
    })
    setIsMuted(true);
  }
  const unMuteAll = ()=>{
    tracks.map((track)=>{
      document.getElementById(`sound${track.id}`).muted = false;
    })
    setIsMuted(false);
  }
  const resetAll = ()=>{
    tracks.map((track)=>{
      document.getElementById(`sound${track.id}`).currentTime = 0;
    })
  }
  const clearAll = ()=>{
    setTracks([]);
    setIsMuted(false);
    setIsPaused(true);
  }
  const props = {
    "play" : playAll,
    "pause" : pauseAll,
    "mute" : muteAll,
    "unmute" : unMuteAll,
    "reset" : resetAll,
    "clear" : clearAll,
    "isPaused" : isPaused,
    "isMuted" : isMuted,
    "setIsPaused" : setIsPaused,
    "setIsMuted" : setIsMuted,
    "showAddTrackPopup" : setShowAddTrackPopup,
    "showSaveCombinationPopup" : setShowSaveCombinationPopup,
    "showWarningPopup": setShowWarningPopup
  }

  useEffect(()=>{

  },[tracks])
  return (
    <div className='mixing-zone'>
      {showAddTrackPopup&&<AddToMixingZone openPopup = {setShowAddTrackPopup} />}
      {showSaveCombinationPopup&&<SaveCombination openPopup = {setShowSaveCombinationPopup}/>}
      {showWarningPopup&&<Warning openPopup={setShowWarningPopup} text='Are you sure you want to clear the mixing zone?' confirm={clearAll}/> }
      <ContainerWide>
        <header>
          <div className="top">
            <h2>Mixing Zone</h2>
            <div className="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" />
            </div>
          </div>
          <div className="description">
            <p>Adjust the volume sliders to find your perfect balance of sounds.</p>
          </div>
        </header>
        <MixingControls {...props} />
        <div className="tracks">
          {
            tracks.map((track)=>{
              return <TrackFlexible track={track} key={track.id}/>
            })
          }
          {!tracks.length && <h3>There are no tracks in the mixing zone... </h3>}
        </div>
        
      </ContainerWide>
    </div>
  )
}

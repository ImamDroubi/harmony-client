import React, { useRef, useState } from 'react'
import "./track.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSliders,faPlay,faPause,faEllipsisVertical,faPenToSquare,faXmark,faCircleInfo,faUser,faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import OverlayDark from '../../overlays/black/OverlayDark';
import MenuDropdown from '../../menus/dropdown/MenuDropdown';
import RangeTime from '../../other/range-time/RangeTime';
import EditTrack from '../../popups/edit-track/EditTrack';
import Warning from "../../popups/warning/Warning";
export default function Track({track}) {
  const [isPaused,setIsPaused] = useState(true);
  const [optionsMenuOpen,setOptionsMenuOpen] = useState(false);
  const [editTrackPopupOpen,setEditTrackPopupOpen] = useState(false);
  const [warningPopupOpen,setWarningPopupOpen]= useState(false);
  const [isLiked,setIsLiked] = useState(false);
  const audioRef = useRef();

  const handleRemoveTrack = ()=>{
    setWarningPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const handleEditTrack = ()=>{
    setEditTrackPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const handleOpenOptionsMenu = ()=>{
    setOptionsMenuOpen((prev)=>!prev);
  }
  const handlePlay = ()=>{
    setIsPaused(false);
    audioRef.current.play();
  }
  const handlePause = ()=>{
    setIsPaused(true);
    audioRef.current.pause();

  }
  const AddToMixingZone =<FontAwesomeIcon icon={faSliders} /> ;
  const playTrack = <FontAwesomeIcon icon={faPlay} />; 
  const pauseTrack = <FontAwesomeIcon icon={faPause} />; 
  const editTrack =<FontAwesomeIcon icon={faPenToSquare} style={{color: "#5dbcbc",}} />;
  const removeTrack = <FontAwesomeIcon icon={faXmark} style={{color: "#5dbcbc",}} />
  const optionsDots = <FontAwesomeIcon icon={faEllipsisVertical} size="lg" style={{color: "#ffffff",}} /> ;
  const trackInfo = <FontAwesomeIcon icon={faCircleInfo} /> ;
  const user = <FontAwesomeIcon icon={faUser} />; 
  const likeTrack = <FontAwesomeIcon icon={solidHeart} />;
  const unLikeTrack = <FontAwesomeIcon icon={regularHeart} />; 

  const optionsList = [
    <a onClick={handleEditTrack}>{editTrack}Edit Track</a>,
    <a onClick={handleRemoveTrack}>{removeTrack}Delete Track</a>,
    // <a>{trackInfo} Track Details</a>
  ]
  return (
    <div className='track' style={{backgroundImage:`url(${track.img})`}}>
      {editTrackPopupOpen && <EditTrack track={track} openPopup={setEditTrackPopupOpen}/>}
      {/* Deletion Function */}
      {warningPopupOpen && <Warning openPopup={setWarningPopupOpen} text='Are You sure you want to delete this track?' confirm={()=>setWarningPopupOpen(false)}/>}
      <OverlayDark />
      <audio ref={audioRef} id={`sound${track.id}`} src={track.sound}></audio> 
      <div onClick={handleOpenOptionsMenu} className="options">{optionsDots}</div>
      {track.is_public&&<div className="public-badge">
        <div className="triangle"></div>
        <div className="rectangle">
          <p>Public</p>
        </div>
      </div>
      }
      {optionsMenuOpen && <MenuDropdown list={optionsList} />}
      <div className="top">
        <h4>{track.title}</h4>
      </div>
      <div className="bottom">
        <RangeTime trackRef={audioRef} setPaused={setIsPaused}/>
        <div className='control' onClick={isPaused?handlePlay:handlePause} >{isPaused?playTrack:pauseTrack}</div>
      </div>
      {track.is_public&&<div className="likes-section">
          <div className="user-info">
            <div>{user}</div>
            <p>Imam Droubi</p>
          </div>
          <div className="like-count">
            {isLiked?
            <div onClick={()=>setIsLiked(!isLiked)}>{likeTrack}</div>
            :
            <div onClick={()=>setIsLiked(!isLiked)} >{unLikeTrack}</div>
            }
            <p>42</p>
          </div>
        </div>}

      
    </div>

  )
}

import React, { useEffect, useRef, useState } from 'react'
import "./combination.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay,faEllipsis,faUser,faHeart as solidHeart,faPenToSquare,faXmark,faPause} from "@fortawesome/free-solid-svg-icons";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import sleep from "../../../assets/images/sleep.jpg";
import OverlayDark from '../../overlays/black/OverlayDark';
import MenuDropdown from '../../menus/dropdown/MenuDropdown';
import EditCombination from '../../popups/edit-combination/EditCombination';
import Warning from '../../popups/warning/Warning';


export default function Combination({combination}) {


  const [isLiked,setIsLiked] = useState(false);
  const [optionsMenuOpen,setOptionsMenuOpen] = useState(false);
  const [isPaused,setIsPaused] = useState(true);
  const [editCombinationPopupOpen,setEditCombinationPopupOpen] = useState(false);
  const [warningPopupOpen,setWarningPopupOpen]= useState(false);
  const [tracks,setTracks] = useState(combination.tracks);
  const combinationStyles = {
    backgroundImage : `url(${combination.photo})`,
    backgroundSize : 'cover',
    backgroundPosition : "20%"
  }
  const user = <FontAwesomeIcon icon={faUser} />; 
  const optionsDots = <FontAwesomeIcon icon={faEllipsis} size="lg" /> ;
  const editCombination =<FontAwesomeIcon icon={faPenToSquare} />;
  const removeCombination = <FontAwesomeIcon icon={faXmark}/>;
  const playCombination = <FontAwesomeIcon style={{transform: "translateX(10%)"}} icon={faPlay} />;
  const pauseCombination = <FontAwesomeIcon icon={faPause} />;
  const likeCombination = <FontAwesomeIcon icon={solidHeart} />;
  const unLikeCombination = <FontAwesomeIcon icon={regularHeart} />; 

  const handleRemoveCombination = ()=>{
    setWarningPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const handleEditCombination = ()=>{
    setEditCombinationPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const handlePlayCombination = ()=>{
    tracks.map(track=>{
      let sound = document.getElementById(`track${track.id}-combination${combination.id}`);
      sound.volume = track.volume/100;
      sound.muted = track.muted ;
      sound.loop = track.repeat;
      sound.play();
    })
    setIsPaused(false);
  }
  const handlePauseCombination = ()=>{
    tracks.map(track=>{
      let sound = document.getElementById(`track${track.id}-combination${combination.id}`);
      sound.pause();
    })
    setIsPaused(true);
  }
  const toggleLike = ()=>{
    setIsLiked((prev)=>!prev);
  }
  const optionsList = [
    <a onClick={handleEditCombination}>{editCombination}Edit Combination</a>,
    <a onClick={handleRemoveCombination}>{removeCombination}Delete Combination</a>
  ]
  return (
    <div className='combination' style={{...combinationStyles}}>
      {editCombinationPopupOpen && <EditCombination combination={combination} openPopup={setEditCombinationPopupOpen}/>}
      {/* Deletion Function */}
      {warningPopupOpen && <Warning openPopup={setWarningPopupOpen} text='Are You sure you want to delete this combination?' confirm={()=>setWarningPopupOpen(false)}/>}
      {tracks.map((track,ind)=>{
        return <audio key={ind} id={`track${track.id}-combination${combination.id}`} src={`${track.sound}`}></audio>
      })}
      <OverlayDark/>
      <div onClick={()=>setOptionsMenuOpen((prev)=>!prev)} className="options">{optionsDots}</div>
      {optionsMenuOpen&&<MenuDropdown list={optionsList}/>}
      {combination.is_public&&<div className="public-badge">
        <div className="triangle"></div>
        <div className="rectangle">
          <p>Public</p>
        </div>
      </div>}
      <div className="top">
        <h6 className="name">{combination.name}</h6>
        <p title={combination.description} className="description">{combination.description.slice(0,40) + (combination.description.length>40?"..." : "") }</p>
      </div>
      <div className="bottom">
        {combination.is_public?
        <div className="left">
          <div className="user-info">
            <div>{user}</div>
            <p>Imam Droubi</p>
          </div>
          <div className="like-count">
            {isLiked?
            <div onClick={toggleLike}>{likeCombination}</div>
            :
            <div onClick={toggleLike} >{unLikeCombination}</div>
            }
          </div>
        </div>
        :
        <div></div>
        }
        <div className="right">
          {isPaused?
          <div onClick={handlePlayCombination}>{playCombination}</div>
          :
          <div onClick={handlePauseCombination} >{pauseCombination}</div>
          }
        </div>
      </div>
    </div>
  )
}

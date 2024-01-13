import React, { useEffect, useState } from 'react'
import "./user-tracks.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faUpload} from '@fortawesome/free-solid-svg-icons';
import ocean from "../../../assets/images/ocean.jpg";
import birds from "../../../assets/images/birds.jpg";
import sleep from "../../../assets/images/sleep.jpg";
import study from "../../../assets/images/study.jpg";
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
import CustomSelect from '../../menus/custom-select/CustomSelect';
import UploadTrack from '../../popups/upload-track/UploadTrack';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserResources } from '../../../apiCalls/resources';
export default function UserTracks() {
  const {currentUser} = useAuth();
  const [user,setUser] = useState();
  const [uploadTrackPopupOpen, setUploadTrackPopupOpen] = useState(false);

  const [currentCategory,setCurrentCategory] = useState();
  const handleCategoryChange = (e)=>{
    setCurrentCategory(e.target.value);
  }
  const categories = [
    "Nature","Animals","Night"
  ]
  const uploadTrack = <FontAwesomeIcon icon={faUpload} />;

  const{isPending, isError, data:tracks, error} = useQuery({ // data here contains tracks
    queryKey: ['tracks', user?.id],
    queryFn: getUserResources,
    enabled : !!user
  });
  const {
    isPending:isPending_categories,
    isError: isError_categories,
    data:data_categories,
    error:error_categories
  } = useQuery({
    queryKey:['categories', user?.id],
    queryFn : getUserResources,
    enabled : !!user
  })
  useEffect(()=>{
    setUser(currentUser);
  },[currentUser])
  if(!user)return "Loading...";
  if(isPending || isPending_categories) return "Loading...";
  if(isError) return `Error: ${error.message}`
  if(isError_categories) return `Error: ${error_categories.message}`
  return (
    <div className='user-tracks'>
      <ContainerWide>
        {uploadTrackPopupOpen&&<UploadTrack openPopup={setUploadTrackPopupOpen}/>}
        <div onClick={()=>setUploadTrackPopupOpen(true)} className="upload">{uploadTrack}</div>
        <header>
          <div className="top">
            <h2>Your Tracks</h2>
            <div className="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" />
            </div>
          </div>
          <div className="description">
            <p>Upload your favorite sounds.</p>
          </div>
          <div className="filter">
            <div className="category">
              <p>Filter: </p>
              <CustomSelect list={data_categories.data.map(category=>category.name)} setCurrentCategory ={setCurrentCategory}/>
            </div>
          </div>
          
        </header>
        <div className="tracks">
          {tracks.data.map((track,ind)=>{
            return (!currentCategory || currentCategory === "All" || currentCategory === track.category)?<Track track={track} key={track.id} number = {ind+1} /> :null;
          })}
        </div>
        
      </ContainerWide>
    </div>
  )
}

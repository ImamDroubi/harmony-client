import React, { useEffect, useRef, useState } from 'react'
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
import UploadTrack from '../upload-track/UploadTrack';
import { getFileRef, uploadFileResumable } from '../../../apiCalls/uploadFile';
import { deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../../../contexts/AuthContext';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUserResources } from '../../../apiCalls/resources';
export default function AddToMixingZone({openPopup,mixingTracks, setMixingTracks}) {
  const {currentUser} = useAuth();
  const [user,setUser] = useState();
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

  const{isPending, isError, data:tracks, error} = useQuery({ 
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

  const AddSelectedTracks = ()=>{
    const newTracks = [];
    selectedTracks.forEach(track=>{
      let found = false ;
      mixingTracks.forEach(item=>{
        if(item.id == track){
          found = true; 
        }
      })
      if(!found)newTracks.push({
        id: track,
        volume : 50
      });
    });

    setMixingTracks([...mixingTracks , ...newTracks]);
    openPopup(false);
  }

  if(!user)return "Loading...";
  if(isPending || isPending_categories) return "Loading...";
  if(isError) return `Error: ${error.message}`
  if(isError_categories) return `Error: ${error_categories.message}`
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
            <CustomSelect list={data_categories.data.map(category=>category.name)} setCurrentCategory={setCurrentCategory}/>
          </div>
        </div>
        <div className="tracks-header">
          <h3>Your Tracks</h3>
          {selectedTracks.length> 0 && <p>{selectedTracks.length} Tracks selected</p>}
        </div>
        <div className="tracks">
          {tracks.data.map((track,ind)=>{
            return <>
              {(!currentCategory || currentCategory === 'All' || currentCategory === track.Category.name )?
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
          <button onClick={AddSelectedTracks} disabled={selectedTracks.length === 0 }>Add Tracks</button>
        </div>
        </>
        :
        <FromComputer/>
        // <form className='form' action="">
        //   <div className="file-field">
        //     <label>Track: </label>
        //     <button><FontAwesomeIcon icon={faUpload} /> Upload</button>
        //     {/* <div className="progress">
        //     </div> */}
        //   </div>
        //   <div className="form-field">
        //     <label>Track Name:</label>
        //     <input placeholder='Ocean, Birds, etc...' type="text" />
        //   </div>
        //   <div className="form-field">
        //     <label>Category:</label>
        //     <input placeholder='Animals, Nature, etc...' type="text" />
        //   </div>
          
        //   <div className="form-field">
        //     <label>Track Image:</label>
        //     <div className="photo">
        //       <button>Upload</button>
        //       <div className="preview">
        //         <img src={track} alt="" />
        //         <OverlayDark/>
        //       </div>
              
        //       {/* <input type="file" name="" id="" /> */}
        //     </div>
        //   </div>
        //   <input type="submit" value="Save Track" />
        // </form>
        }
      </div>
    </PopupLayout>
  )
}

const FromComputer = ()=>{
  const {currentUser} = useAuth()
  const trackName = useRef();
  const trackCategory = useRef();
  const [currentImage, setCurrentImage]= useState();
  const [currentTrack,setCurrentTrack] = useState();
  const [trackUploadRef,setTrackUploadRef] = useState();
  const [taskUploadRef,setTaskUploadRef] = useState();
  const [imageUploadRef,setImageUploadRef] = useState();
  const [imageUrl,setImageUrl] = useState();
  const [trackUrl,setTrackUrl] = useState();
  const [submitEnabled, setSubmitEnabled] = useState(true); 
  const [imageUploading, setImageUploading] = useState(false);
  const [trackUploading, setTrackUploading] = useState(false);
  const [trackUploadProgress,setTrackUploadProgress] = useState(0);

  const [formSubmitting, setFormSubmitting] = useState(false);
  useEffect(()=>{
    uploadImage();
  },[currentImage])
  useEffect(()=>{
    uploadTrack();
  },[currentTrack])
  const uploadImage = async ()=>{
    if(currentImage == null){
      return; 
    }
    if(imageUploadRef){
      try{
        const res = deleteObject(imageUploadRef);
        setImageUrl(null);
      }catch(error){
        console.log(error);
      }
      
    }
    setImageUploading(true);
    try{
      const response = await uploadFileResumable(currentImage,"image", currentUser.id);
      const url = await getDownloadURL(response.ref);
      setImageUploadRef(response.ref);
      setImageUrl(url);
    }catch(error){
      console.log(error);
    }finally{
      setImageUploading(false);
    }
  }

  const uploadTrack = async ()=>{
    if(currentTrack == null){
      return; 
    }
    if(taskUploadRef){
      taskUploadRef.cancel();
    }
    if(trackUploadRef){
      try{
        const res = deleteObject(trackUploadRef);
        setImageUrl(null);
      }catch(error){
        console.log(error);
      }
    }
    setTrackUploading(true);
    const fileRef = getFileRef(currentTrack,"track",currentUser.id);
    const uploadTask = uploadBytesResumable(fileRef,currentTrack);
    setTaskUploadRef(uploadTask);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setTrackUploadProgress(progress);
    }, 
    (error) => {
      setTrackUploading(false);
      switch (error.code) {
        case 'storage/canceled':
          console.log("Upload Cancelled...");
          break;
        case 'storage/unknown':
          console.log("Something went wrong...");
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setTrackUploadRef(uploadTask.snapshot.ref);
        setTrackUrl(downloadURL);
        setTrackUploading(false);
      });
    }
    );
  }
  const submit = (e)=>{
    e.preventDefault();
    setFormSubmitting(true);
  }
  return (
    <form action="">
        <div className="file-field">
            <label>Track: {currentTrack?.name}</label>
            <input onChange={(e)=>setCurrentTrack(e.target.files[0])} type="file" name="file" id="file" accept='audio/*' hidden/>
            <label htmlFor='file' className='upload-track-button'><FontAwesomeIcon icon={faUpload} /> Upload</label>
            {trackUploading&&<LinearProgress value={trackUploadProgress} style={{width:'100%', marginBottom:'0px'}} />}
          </div>
          <div className="form-field">
            <label>Track Name:</label>
            <input ref={trackName} placeholder='Ocean, Birds, etc...' type="text" />
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input ref={trackCategory} placeholder='Animals, Nature, etc...' type="text" />
          </div>
          <div className="form-field">
            <label>Track Image:</label>
            <div className="photo">
              <input onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" name="image" id="image" accept="image/*"  hidden/>
              {!imageUploading&&<label htmlFor='image'  className='upload-image-button'>Upload</label>}
              <div className="preview">
                <img src={imageUrl || track} alt="" />
                <OverlayDark/>
              </div>
              
              {/* <input type="file" name="" id="" /> */}
            </div>
          </div>
          {imageUploading&&<LinearProgress style={{width:'100%', marginBottom:'0px'}} />}
          {!formSubmitting && <input disabled={
            !submitEnabled || trackUrl == null 
            || trackName.current.value == null || trackCategory.current.value == null
            || imageUploading || trackUploading
          } type="submit" value="Save Track" />}
          {formSubmitting && <CircularProgress/>}
        </form>
  )
}

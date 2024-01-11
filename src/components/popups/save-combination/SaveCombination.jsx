import React, { useEffect, useState } from 'react'
import "./save-combination.scss";
import OverlayDark from '../../overlays/black/OverlayDark';
import track from "../../../assets/images/track.jpg";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { deleteObject, getDownloadURL } from 'firebase/storage';
import { uploadFileResumable } from '../../../apiCalls/uploadFile';
import { useAuth } from '../../../contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
export default function SaveCombination({openPopup}) {
  const {currentUser} = useAuth();
  const [currentImage, setCurrentImage]= useState();
  const [imageUploadRef,setImageUploadRef] = useState();
  const [imageUrl,setImageUrl] = useState();
  const [imageUploading, setImageUploading] = useState(false);
  useEffect(()=>{
    uploadImage();
  },[currentImage])
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
  const createCombination = useMutation({
    mutationFn : (payload)=>{
      return axios.post(`/combinations`, payload);
    },
    onMutate:(variables)=>{
      console.log(variables);
    },
    onError:(error,variables,context)=>{
      console.log(error);
    },
    onSuccess:(data,variables,context)=>{
      console.log(data);
      console.log("Created Successfully");
      postSubmission();
    }
  })

  const submit = (e)=>{

  }
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
          <div className="row-fields">
            <div className="form-field">
              <label>Descrption:</label>
              <textarea placeholder='Descripe the combination you made...' name="" id=""></textarea>
              
            </div>
            <div className="form-field">
              <label>Combination Image:</label>
              <div className="photo">
                <input onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" name="combination-image" id="combination-image" hidden/>
                {!imageUploading&&<label className='combination-image-upload' htmlFor='combination-image'>Upload</label>}
                <div className="preview">
                  <img src={imageUrl || track} alt="" />
                  <OverlayDark/>
                </div>
                
              </div>
            </div>
          </div>
          
          <input type="submit" value="Save Combination" />
        </form>
      </div>
    </PopupLayout>
  )
}

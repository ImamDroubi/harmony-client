import React, { useEffect, useRef, useState } from 'react'
import "./edit-profile.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import ButtonStrong from '../../buttons/button-strong/ButtonStrong';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons';
import person1 from '../../../assets/images/person1.jpg';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { uploadFileResumable } from '../../../apiCalls/uploadFile';
import { deleteObject, getDownloadURL } from 'firebase/storage';
export default function EditProfile() {
  const {currentUser} = useAuth();
  const [isPasswordReset,setIsPasswordReset] = useState(false);
  const [currentImage,setCurrentImage] = useState();
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
  return (
    <div className='edit-profile'>
      <ContainerWide>
        <div className="card">
          <div className="left">
            <div className="info">
              <div className="picture">
                <img src={imageUrl || person1} />
                {!isPasswordReset&&<><input onChange={(e)=>setCurrentImage(e.target.files[0])} type="file" name="profile-picture" id="profile-picture" accept="image/*" hidden />
                {!imageUploading&&<label htmlFor='profile-picture'>Upload</label>}</>}
              </div>
              <h2 className='name'>John Doe</h2>
              <p className='followers'>55 followers</p>
            </div>
          </div>
          <div className="right">
                
                {
                isPasswordReset
                ?<ResetPasswordForm imageUrl={imageUrl} toggle = {setIsPasswordReset}/>
                :<PersonalInfoForm imageUrl={imageUrl} toggle={setIsPasswordReset}/>
                }
                
              </div>
        </div>
      </ContainerWide>
    </div>
  )
}

const ResetPasswordForm = ({toggle,imageUrl})=>{
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const repeatPassRef = useRef();
  const [submitable,setSubmitable] = useState(false);

  const onFormChange = ()=>{
    const oldPass = oldPassRef.current.value;
    const newPass = newPassRef.current.value;
    const repeatPass = repeatPassRef.current.value;
    if(!oldPass || !newPass || !repeatPass  || newPass!==repeatPass){
      setSubmitable(false);
    }else setSubmitable(true);
  }
  return (
    <>
      <div className="title">
        <h2>Reset Password</h2>
      </div>
      <form onInput={onFormChange} action="">
        <div className="form-field">
          <FontAwesomeIcon icon={faKey} />
          <label>Old Password:</label>
          <input ref={oldPassRef}  type="password" />
        </div>
        <div className="form-field">
          <FontAwesomeIcon icon={faKey} />
          <label>New Password:</label>
          <input ref={newPassRef}  type="password" />
        </div>
        <div className="form-field">
          <FontAwesomeIcon icon={faKey} />
          <label>Repeat New Password:</label>
          <input ref={repeatPassRef}  type="password" />
        </div>
        <a onClick={()=>toggle(false)}>Personal Information</a>
        <input disabled={!submitable} type="submit" value="Submit" />
      </form>
    </>
  )
}
const PersonalInfoForm = ({toggle,imageUrl})=>{
  const {currentUser} = useAuth();
  const [username,setUserName] = useState();
  const [email,setEmail] = useState();
  const [oldUsername,setOldUserName] = useState();
  const [oldEmail,setOldEmail] = useState();
  const [changed, setChanged] = useState(false);
  useEffect(()=>{
    setUserName(currentUser?.username);
    setEmail(currentUser?.email);
    setOldEmail(currentUser?.email);
    setOldUserName(currentUser?.username);

  },[currentUser])

  useEffect(()=>{
    if(username===oldUsername && email ===oldEmail && !imageUrl){
      setChanged(false);
    }else setChanged(true);
  },[username,email,imageUrl])
  return (
    <>
      <div className="title">
        <h2>Personal Information</h2>
      </div>
      <form action="">
        <div className="form-field">
          <FontAwesomeIcon icon={faUser} size="sm"/>
          <label>Username:</label>
          <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" />
        </div>
        <div className="form-field">
          <FontAwesomeIcon icon={faEnvelope} />
          <label>Email Address:</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" />
        </div>
        <a onClick={()=>toggle(true)}>Reset Password</a>
        <input disabled={!changed} type="submit" value="Submit" />
      </form>
    </>
  )
}
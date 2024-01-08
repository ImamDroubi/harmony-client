import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MixingZone from '../mixing-zone/MixingZone'
import UserCombinations from '../user-combinations/UserCombinations'
import UserTracks from '../user-tracks/UserTracks'
import UserPublic from '../user-public/UserPublic'
import { useAuth } from '../../../contexts/AuthContext'

export default function ProtectedRoutes() {
  const {currentUser} = useAuth();
  if(!currentUser){
    return <Navigate to="/" replace />
  }
  return (
    <Routes>
      <Route path='mixing-zone' element={<MixingZone/>}/>
      <Route path='combinations' element={<UserCombinations/>}/>
      <Route path='tracks' element={<UserTracks/>}/>
      <Route path='public' element={<UserPublic/>}/>
    </Routes>
  )
}

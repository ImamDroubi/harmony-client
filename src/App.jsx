import './App.css'
import AnonymousLayout from './components/screens/anonymous-layout/AnonymousLayout';
import EditProfile from './components/screens/edit-profile/EditProfile';
import MainLayout from './components/screens/main-layout/MainLayout';
import MixingZone from './components/screens/mixing-zone/MixingZone';
import QuickTry from './components/screens/quick-try/QuickTry';
import SignIn from './components/screens/sign-in/SignIn';
import SignUp from './components/screens/sign-up/SignUp';
import TopbarLayout from './components/screens/topbar-layout/TopbarLayout';
import UserCombinations from './components/screens/user-combinations/UserCombinations';
import UserProfile from './components/screens/user-profile/UserProfile';
import UserTracks from './components/screens/user-tracks/UserTracks';
import Welcome from './components/screens/welcome/Welcome'
import {AuthProvider} from "./contexts/AuthContext";
import { Routes,Route, Router } from 'react-router-dom';
function App() {

  return (
      <AuthProvider>
        <Routes>
          <Route path='/' element ={<Welcome/>} />
          <Route path='/try' element ={<QuickTry/>} />
          
          <Route path='/*' element={<TopbarLayout/>}>
            <Route path='' element={<AnonymousLayout/>}>
              <Route path='login' element ={<SignIn/>} />
              <Route path='register' element ={<SignUp />}/>
            </Route>
            <Route path='user/:id' element ={<UserProfile/>}/>
            <Route path='profile' element ={<EditProfile/>}/>
          </Route>

          <Route path='/*' element ={<MainLayout />}>
            <Route path='mixing-zone' element={<MixingZone/>}/>
            <Route path='user-combinations' element={<UserCombinations/>}/>
            <Route path='user-tracks' element={<UserTracks/>}/>
          </Route>
        </Routes>
      </AuthProvider>
  )
}

export default App

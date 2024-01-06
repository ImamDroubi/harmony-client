import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import  axios  from 'axios'
import { ThemeProvider, createTheme } from '@mui/material'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_ORIGIN;
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
const theme = createTheme({
  palette:{
    primary:{
      main: '#5dbcbc',
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
)

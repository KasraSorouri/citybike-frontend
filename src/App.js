import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Stations from './components/Stations'
import Navigation from './components/Navigation'
import StationInfo from './components/StationInfo'
import FileUpload from './components/FileUpload'
import { Container } from '@mui/material'
import Trips from './components/Trips'
import AboutApp from './components/AboutApp'

function App() {

  return (
    <div>
      <Container  maxWidth='xl'>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<AboutApp />} />
            <Route path='/trips' element={<Trips />} />
            <Route path='/stations' element={<Stations />} />
            <Route path='/station/:sid' element={<StationInfo />} />
            <Route path='/uploadFiles' element={<FileUpload />} />
          </Routes>
        </Router>
      </Container>
    </div>
  )
}

export default App

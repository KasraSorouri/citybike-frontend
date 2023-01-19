import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Stations from './components/Stations'
import Trips from './components/Trips'
import Navigation from './components/Navigation'
import StationInfo from './components/StationInfo'
import FileUpload from './components/FileUpload'
import { Container } from '@mui/material'

function App() {

  return (
    <div>
      <Container maxWidth={{ width: 1400 }}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/trips" element={<Trips  />} />
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

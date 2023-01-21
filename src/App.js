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
import TripFilter from './components/TripFilter'
import TripsFilterPage from './components/TripFilterPage'

function App() {

  return (
    <div>
      <Container>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/trips" element={<Trips  />} />
            <Route path="/trips/filter" element={<TripsFilterPage  />} />
            <Route path='/stations' element={<Stations />} />
            <Route path='/station/:sid' element={<StationInfo />} />
            <Route path='/uploadFiles' element={<FileUpload />} />
            <Route path='/filter' element={<TripFilter />} />
          </Routes>
        </Router>
      </Container>
    </div>

  )
}

export default App

import React from 'react'
import { Container } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Stations from './components/Stations'
import Trips from './components/Trips'
import Navigation from './components/Navigation'

function App() {

  return (
    <Container>
      <Router>
        <Navigation />
        <h1>City bike Application</h1>
        <Routes>
          <Route path="/trips" element={<Trips  />} />
          <Route path='/stations' element={<Stations />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App

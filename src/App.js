import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Trips from './components/Trips'

function App() {

  return (
    <Router>
      <h1>City bile Application</h1>
      <Routes>
        <Route path="/trips" element={<Trips  />} />
      </Routes>


    </Router>
  )
}

export default App

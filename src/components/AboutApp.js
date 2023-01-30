import React from 'react'

const AboutApp = () => {
  return(
    <div>
      <h1>About this App</h1>
      <p>This is a basic app for showing bike trips and some statistics about bike stations. It was done based on a pre-assignment challenge from Solita, and Solita supplied the journey and station data.
          I made the decision to use NodeJS and Express for the backend due to the ease of the calculations and the vast amount of records and data and ReactJS for the frontend. Additionally, I think MongoDB is a great choice for a database because in reality, the information for the journeys and stations for this app is not related to each other.
      </p>
    </div>
  )
}

export default AboutApp
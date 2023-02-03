import React from 'react'
import { Box , Typography } from '@mui/material'

const AboutApp = () => {
  return(
    <Box>
      <Typography variant="h4" gutterBottom marginTop={3}>
        About this App
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
      This app provides you with some basic information about bike trips in the area and
      it provides some statistics about the bike stations in the area.
      This was done as part of a pre-assignment challenge from
        <a href='https://www.solita.fi/sv/positions/dev-academy-to-boost-your-software-developer-career-5427532003/'><b> Solita </b></a>
      , and Solita provided the journey and station data.
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        The backend is built with <b>NodeJS</b> and <b>Express</b>, and the frontend is built with <b>ReactJS</b>.
      </Typography>
      <Typography variant="h4" gutterBottom marginTop={2}>
        Backend
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        You can download the backend and find more information at:
        <a href='https://github.com/KasraSorouri/cityBike' > https://github.com/KasraSorouri/cityBike </a>
      </Typography>
      <Typography variant="h4" gutterBottom marginTop={2}>
        frontend
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
         If you are only interested in the frontend, it is available at:
        <a href='https://github.com/KasraSorouri/citybike-frontend' > https://github.com/KasraSorouri/citybike-frontend </a>
      </Typography>
      <Typography variant="h4" gutterBottom marginTop={2}>
        How it works
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Trips
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        Different functions can be selected from the top menu.
        All of the trips are displayed on the trips page. You can see more trips by visiting the other pages. The trips can also be filtered using the FILTER button at the top of the page.
        By clicking on the table header, you can sort the data.
      </Typography>
      <Typography variant="subtitle2" gutterBottom marginTop={2}>
        Stations
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        On the Stations page, you can find general information about bike stations
         such as name, address, capacity, and address. When you click on a station row,
         you are taken to the station info page, which displays some basic station statistics
         as well as location of the station on the map.
      </Typography>
      <Typography variant="subtitle2" gutterBottom marginTop={2}>
        StationInfo
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        This page displays some basic statistics about the trips related with this station.
        such as the 5 stations that were popular destinations for trips that began at this station.
        and the top five origins for trips that end at these stations.
        Some station information, such as name, address, capacity, rounded trips, and map location.
      </Typography>
      <Typography variant="subtitle2" gutterBottom marginTop={2}>
        Upload Data
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        In ths page Trips ,and Stations data can be uploaded as a CSV file with a &quot;, &quot; separator.
        The first row was also ignored by the program and treated as a headline.
        You should select the type of data you want to update on the upload page.
        (trips or stations), then select your file and deactivate the duplication check option.
        By deactivating the duplication check option, data is stored on the database faster, but there is a risk of duplicate data,
        which reduces the validity of statistical reports.
      </Typography>


    </Box>
  )
}

export default AboutApp
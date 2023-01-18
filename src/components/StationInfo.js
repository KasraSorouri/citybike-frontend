import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Map, Marker, ZoomControl  } from 'pigeon-maps'
import stationServices from '../servises/stationServices'

import { styled } from '@mui/material/styles'
import MuiGrid from '@mui/material/Grid'
import {
  Divider,
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material'

const StationInfo = (sid) => {
  const stationId = useParams(sid)

  const [stationData, setStationData] = useState(null)
  const [stationList, setStationList] = useState([])

  const navigate = useNavigate()
  let station

  useEffect(() =>  {
    stationServices.getStationInfo(stationId.sid)
      .then((response) => setStationData(response))
    stationServices.getAllStations()
      .then((response) => setStationList(response))
  },[stationId])

  if (stationData){
    station = stationData.stationInfo
  }


  const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 3),
    },
  }))

  const columnHeader = [
    { id: 'stationName', lable: 'Station Name', minWidth: 150 },
    { id: 'repetitions', lable: 'Repetitions', minWidth: 5 },
    { id: 'distance', lable: 'Distance (km)', minWidth: 10 },
    { id: 'durations', lable: 'Durations (min)', minWidth: 10 }
  ]

  const Origins = () => {
    return(
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={4} >
                  Origins with the most repetitions                </TableCell>
              </TableRow>
              <TableRow>
                {columnHeader.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.lable}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { stationData.departureFrom.map((station) => {
                return(
                  <TableRow key={station._id} >
                    <TableCell align='left' >
                      {station._id}
                    </TableCell>
                    <TableCell align='center' >
                      {station.count}
                    </TableCell>
                    <TableCell align='center' >
                      {(station.distance/1000).toFixed(1)}
                    </TableCell>
                    <TableCell align='center' >
                      {(station.duration/60).toFixed(1)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const Destinations = () => {
    return(
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={4} >
                  The most pouplar Destinations
                </TableCell>
              </TableRow>
              <TableRow>
                {columnHeader.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.lable}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { stationData.destinationTo.map((station) => {
                return(
                  <TableRow key={station._id} >
                    <TableCell align='left' >
                      {station._id}
                    </TableCell>
                    <TableCell align='center' >
                      {station.count}
                    </TableCell>
                    <TableCell align='center' >
                      {(station.distance/1000).toFixed(1)}
                    </TableCell>
                    <TableCell align='center' >
                      {(station.duration/60).toFixed(1)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const BrifStation = () => {
    return(
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={2} variant="head" >
                  <h3>{station.nameFinnish} station</h3>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left'  variant="head" >
                  Station capacity
                </TableCell>
                <TableCell align='center' variant="head">
                  {station.capacity}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='left'  variant="head" >
                  Total trip from this station
                </TableCell>
                <TableCell align='center' variant="head">
                  {stationData.totalTripFromStation}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left'  variant="head" >
                  Total trip to this station
                </TableCell>
                <TableCell align='center' variant="head">
                  {stationData.totalTripToStation}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left'  variant="head" >
                  Total round trip by this station
                </TableCell>
                <TableCell align='center' variant="head">
                  {stationData.returnTrip[0].count}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left'  variant="head" >
                  Avarage distance of round Trips
                </TableCell>
                <TableCell align='center' variant="head">
                  {((stationData.returnTrip[0].distance)/1000).toFixed(1)} (km)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left'  variant="head" >
                  Avarage duration of round Trips
                </TableCell>
                <TableCell align='center' variant="head">
                  {((stationData.returnTrip[0].duration)/60).toFixed(1)} (min)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const searchHandler = (item) => {
    const sid = (item.split(',')[1]).toString()
    navigate(`/station/${sid}`)
  }

  if (!(stationData && station)) {
    return null
  }

  return(
    <div>
      <h1>Station information</h1>
      <h2>&nbsp; Station name: {station.nameFinnish} ({station.nameSwedish})</h2>
      <Autocomplete
        freeSolo
        id='search'
        disableClearable
        options={stationList.map((option) => `${option.name},${option.id}`)}
        onChange={(event, newInputValue) => {
          searchHandler(newInputValue)
        }}
        renderInput={(params) => {
          return(
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />

          )}}
      />
      <Grid container>
        <Grid item xs>
          <Origins />
        </Grid>
        <Divider orientation="vertical" flexItem>
          <h2>{station.nameFinnish}</h2>
          <p>Station</p>
        </Divider>
        <Grid item xs>
          <Destinations />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container>
        <Grid item xs>
          <BrifStation />
        </Grid>
        <Divider orientation="vertical" flexItem>
        </Divider>
        <Grid item xs>
          <Grid align='center'>
            <h3>Address: {station.addressFinnish}</h3>
          </Grid>
          <br />
          <Map height={350} defaultCenter={[60.22,24.82]} defaultZoom={10}>
            <Marker width={30} anchor={[station.location.latitude, station.location.longtitude]} color='red' value='test' ></Marker>
            <ZoomControl />
          </Map>
        </Grid>
      </Grid>
    </div>
  )
}

export default StationInfo
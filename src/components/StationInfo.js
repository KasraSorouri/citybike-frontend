import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Map, Marker, ZoomControl  } from 'pigeon-maps'
import { initialize } from '../reducers/stationReducer'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { createSearchParams } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import MuiGrid from '@mui/material/Grid'
import {
  Divider,
  Autocomplete,
  TextField,
  Table,
  Box,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material'

import stationServices from '../servises/stationServices'
import parameterServise from '../servises/parameter'

const StationInfo = (id) => {
  const sid = useParams(id).sid

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [stationData, setStationData] = useState(null)
  const [parameter, setParameter]= useState([])
  const [dates, setDates] = useState({ start: null , end: null })
  const [month, setMonth] = useState(null)

  const station = useSelector(state => state.station.find(station => station.id === sid))
  const stations = useSelector(state => state.station)
  const stationList = stations.map(station => `${station.nameFinnish},${station.stationId}`)

  //Given that the beginning of the day is taken into account when selecting the day.
  //we will add one day to it so that it can be considered in the filter.
  const theDayAfter = new Date(dates.end)
  theDayAfter.setDate(theDayAfter.getDate()+1)
  const filter = {
    'start': dates.start ? dates.start.toISOString() : 'null' ,
    'end': dates.end ? theDayAfter.toISOString() : 'null'
  }

  let filterData = `${createSearchParams(filter)}`
  useEffect(() =>  {
    if (station) {
      stationServices.getStationInfo(station.stationId, filterData)
        .then((response) => setStationData(response))
    }
  },[station, dates])


  useEffect(() =>  {
    parameterServise.getParameter()
      .then((response) => setParameter(response))
    dispatch(initialize())
  },[])

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
        <TableContainer data-testid='originTable'>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={4} >
                  Origins with the most repetitions
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
        <TableContainer data-testid='destinationTable'>
          <Table size='small'>
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
        <TableContainer data-testid='stationTable'>
          <Table size='small' >
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
                The average distance of trips starting from this station
                </TableCell>
                <TableCell align='center' variant="head">
                  {((stationData.avrageTripFromStation)/1000).toFixed(1)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left'  variant="head" >
                The average distance of trips starting to this station
                </TableCell>
                <TableCell align='center' variant="head">
                  {((stationData.avrageTripToStation)/1000).toFixed(1)}
                </TableCell>
              </TableRow>
              {(stationData.returnTrip[0]) ?
                (<><TableRow>
                  <TableCell align='left' variant="head">
                    Total round trip by this station
                  </TableCell>
                  <TableCell align='center' variant="head">
                    {stationData.returnTrip[0].count}
                  </TableCell>
                </TableRow><TableRow>
                  <TableCell align='left' variant="head">
                      Avarage distance of round Trips
                  </TableCell>
                  <TableCell align='center' variant="head">
                    {((stationData.returnTrip[0].distance) / 1000).toFixed(1)} (km)
                  </TableCell>
                </TableRow><TableRow>
                  <TableCell align='left' variant="head">
                      Avarage duration of round Trips
                  </TableCell>
                  <TableCell align='center' variant="head">
                    {((stationData.returnTrip[0].duration) / 60).toFixed(1)} (min)
                  </TableCell>
                </TableRow></>
                ) : null }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const searchHandler = (item) => {
    const stationId = (item.split(',')[1]).toString()
    const sid  = stations.find(station => station.stationId === `${stationId}`).id
    navigate(`/station/${sid}`)
  }

  const handleStartDate = (value) => {
    setDates(values => ({ ...values, 'start': value }))
    setMonth(null)
  }
  const handleEndDate = (value) => {
    setDates(values => ({ ...values, 'end': value }))
    setMonth(null)
  }
  const handleMonth = (value) => {
    setMonth(value)
    const y = value.getFullYear()
    const m = value.getMonth()
    setDates({ start: new Date(y,m) , end: new Date(y,m+1) })
  }

  const SearchStation = () => {
    return(
      <Stack direction={'row'} spacing={1}>
        <Autocomplete
          freeSolo
          id='search'
          disableClearable
          options={stationList}
          onChange={(event, newInputValue) => {
            searchHandler(newInputValue)
          }}
          renderInput={(params) => {
            return(
              <TextField
                {...params}
                label="Search input"
                sx={{ width: '25ch' }}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Date from'
            name='startDate'
            minDate={parameter.earliest}
            maxDate={parameter.latest}
            value={dates.start}
            onChange={handleStartDate}
            renderInput={(params) => <TextField {...params} sx={{ maxWidth: 150 }}/>
            }
          />
          <DatePicker
            label='Date to'
            name='EndDate'
            minDate={parameter.earliest}
            maxDate={parameter.latest}
            value={dates.end}
            onChange={handleEndDate}
            renderInput={(params) => <TextField {...params}  sx={{ maxWidth: 150 }}/>
            }
          />
          <Divider orientation="vertical" variant='middle' flexItem={false} >
            or
          </Divider>
          <DatePicker
            label='Select Month'
            name='Month'
            minDate={parameter.earliest}
            maxDate={parameter.latest}
            openTo='year'
            value={month}
            views={['year','month']}
            onChange={handleMonth}
            renderInput={(params) => <TextField {...params}  sx={{ maxWidth: 150 }}/>
            }
          />
        </LocalizationProvider>
      </Stack>
    )
  }

  if (!(stationData && station)) {
    return(
      <div>
        <SearchStation />
      </div>
    )
  }

  return(
    <Box>
      <Stack direction={'row'} spacing={50} marginTop={3}>
        <h1>Station information</h1>
        <SearchStation  />
      </Stack>
      <h2>&nbsp; &nbsp; &nbsp; Station name: {station.nameFinnish} ({station.nameSwedish})</h2>
      <Grid container spacing={3}>
        <Grid item sm>
          <Origins />
        </Grid>
        <Divider orientation="vertical" flexItem>
          <h2>{station.nameFinnish}</h2>
          <p>Station</p>
        </Divider>
        <Grid item sm>
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
            <Marker width={30} anchor={[station.location.latitude, station.location.longtitude]} color='red' value='test'></Marker>
            <ZoomControl />
          </Map>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StationInfo
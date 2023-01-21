import React , { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  MenuItem
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import stationServices from '../servises/stationServices'
import parameterServise from '../servises/parameter'
import { useNavigate, createSearchParams } from 'react-router-dom'

const TripFilter = () => {
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({})
  const [dates, setDates] = useState({ start: null , end: null })
  const [stationList, setStationList] = useState([])
  const [parameter, setParameter]= useState([])

  useEffect(() =>  {
    stationServices.getAllStations()
      .then((response) => setStationList(response))
    parameterServise.getParameter()
      .then((response) => setParameter(response))
  },[])

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    const filter = { ...inputs, 'start': dates.start, 'end': dates.end }
    event.preventDefault()
    let params = {}
    filter.originStation ? params.originStation = filter.originStation : params.originStation = 'null'
    filter.destinationStation ? params.destinationStation = filter.destinationStation : params.destinationStation = 'null'
    filter.durationFrom ? params.durationFrom = filter.durationFrom : params.durationFrom = 'null'
    filter.durationTo ? params.durationTo = filter.durationTo : params.durationTo = 'null'
    filter.distanceFrom ? params.distanceFrom = filter.distanceFrom : params.distanceFrom = 'null'
    filter.distanceTo ? params.distanceTo = filter.distanceTo : params.distanceTo = 'null'
    filter.start ? params.start = filter.start.toISOString() : params.start = 'null'
    const theDayAfter = new Date(filter.end)
    theDayAfter.setDate(theDayAfter.getDate()+1)
    filter.end ? params.end = theDayAfter.toISOString() : params.end = 'null'

    navigate({
      pathname: '/trips/filter',
      search: `?${createSearchParams(params)}`
    })
  }
  const handleStartDate = (value) => {
    setDates(values => ({ ...values, 'start': value }))
  }
  const handleEndDate = (value) => {
    setDates(values => ({ ...values, 'end': value }))
  }

  return(
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        flex={6}
      >
        <div>
          <TextField
            id="originStation"
            label="Origin Station"
            select
            defaultValue={''}
            name='originStation'
            onChange={ event => handleChange(event)}
          >
            {stationList.map((option) => (
              <MenuItem key={option.id} value={ option.id } >
                {`${option.name},${option.id}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="destinationStation"
            label="Destination Station"
            select
            defaultValue={''}
            name='destinationStation'
            onChange={ event => handleChange(event)}
          >
            {stationList.map((option) => (
              <MenuItem key={option.id} value={ option.id } >
                {`${option.name},${option.id}`}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Trip Start"
              name='startDate'
              minDate={parameter.earliest}
              maxDate={parameter.latest}
              value={dates.start}
              onChange={handleStartDate}
              renderInput={(params) => <TextField {...params} sx={{ maxWidth: 150 }}/>
              }
            />
            <DatePicker
              label="Trip End"
              name='EndDate'
              minDate={parameter.earliest}
              maxDate={parameter.latest}
              value={dates.end}
              onChange={handleEndDate}
              renderInput={(params) => <TextField {...params}  sx={{ maxWidth: 150 }}/>
              }
            />
          </LocalizationProvider>
          <Box>
            Duration between
            <TextField
              id="durationFrom"
              label="Duration >="
              name='durationFrom'
              sx={{ maxWidth: 80 }}
              onChange={ event => handleChange(event)}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#62;=</InputAdornment>,
              }}
            />
            <TextField
              id="durationTo"
              label="Duration <="
              name='durationTo'
              sx={{ maxWidth: 80 }}
              onChange={ event => handleChange(event)}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#60;=</InputAdornment>,
              }}
            />
            &nbsp; &nbsp; &nbsp; Distance between
            <TextField
              id="distanceFrom"
              label="Distance >="
              name='distanceFrom'
              sx={{ maxWidth: 80 }}
              onChange={ event => handleChange(event)}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#62;=</InputAdornment>,
              }}
            />
            and
            <TextField
              id="distanceTo"
              label="Distance <="
              name='distanceTo'
              sx={{ maxWidth: 80 }}
              onChange={ event => handleChange(event)}
              InputProps={{
                startAdornment: <InputAdornment position="start">&#60;=</InputAdornment>,
              }}
            />
            <Button variant="contained" size='large'  sx={{ mt: 1, height:50 }}  onClick={handleSubmit}>filter</Button>
          </Box>
        </div>
      </Box>
    </div>
  )
}
export default TripFilter
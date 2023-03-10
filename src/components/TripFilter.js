import React , { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  Stack,
  Grid,
  InputLabel
} from '@mui/material'

import parameterServise from '../servises/parameter'
import { initialize } from '../reducers/stationReducer'
import { resetFilter, setFilter } from '../reducers/filterReducer'


const TripFilter = ({ filterHandler }) => {
  const dispatch = useDispatch()

  const initialFilterPrameter = {
    originStation: '',
    destinationStation: '',
    durationFrom: '',
    durationTo: '',
    distanceFrom: '',
    distanceTo: '',
    start: '',
    end: ''
  }

  const [inputs, setInputs] = useState(initialFilterPrameter)
  const [dates, setDates] = useState({ start: null , end: null })
  const [parameter, setParameter]= useState([])

  useEffect(() =>  {
    parameterServise.getParameter()
      .then((response) => setParameter(response))
    dispatch(initialize())
  },[])

  const stationList = useSelector(state => state.station.map(station => ({
    id: station.id,
    value: `${station.stationId}`,
    name: `${station.nameFinnish},${station.stationId}`
  })))

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleStartDate = (value) => {
    setDates(values => ({ ...values, 'start': value }))
  }
  const handleEndDate = (value) => {
    setDates(values => ({ ...values, 'end': value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const filter = { ...inputs, 'start': dates.start, 'end': dates.end }
    dispatch(setFilter(filter))
    filterHandler()
  }

  const handleReset = () => {
    dispatch(resetFilter())
    setDates({ start: null , end: null })
    setInputs(initialFilterPrameter)
    filterHandler()
  }

  return(
    <div>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
        flex={6}
      >
        <Grid container>
          <Grid>
            <TextField
              id='originStation'
              label='Origin Station'
              select
              defaultValue={''}
              value={inputs.originStation}
              name='originStation'
              onChange={ event => handleChange(event)}
            >
              {stationList.map((option) => (
                <MenuItem key={option.id} value={ option.value } >
                  {`${option.name}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='destinationStation'
              label='Destination Station'
              select
              defaultValue={''}
              value={inputs.destinationStation}
              name='destinationStation'
              onChange={ event => handleChange(event)}
            >
              {stationList.map((option) => (
                <MenuItem key={option.id} value={ option.value } >
                  {`${option.name}`}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Trip Start'
                name='startDate'
                minDate={parameter.earliest}
                maxDate={parameter.latest}
                value={dates.start}
                onChange={handleStartDate}
                renderInput={(params) => <TextField {...params} sx={{ maxWidth: 150 }}/>
                }
              />
              <DatePicker
                label='Trip End'
                name='EndDate'
                minDate={parameter.earliest}
                maxDate={parameter.latest}
                value={dates.end}
                onChange={handleEndDate}
                renderInput={(params) => <TextField {...params}  sx={{ maxWidth: 150 }}/>
                }
              />
            </LocalizationProvider>
            <Stack direction={'row'} flex justifyContent="space-between" >
              <InputLabel sx={{ marginTop: 3 }}>Duration between</InputLabel>
              <TextField
                id='durationFrom'
                label='Duration >='
                name='durationFrom'
                value={inputs.durationFrom}
                sx={{ maxWidth: 80 }}
                onChange={ event => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#62;=</InputAdornment>,
                }}
              />
              <InputLabel sx={{ marginTop: 3 }}>and</InputLabel>
              <TextField
                id='durationTo'
                label='Duration <='
                name='durationTo'
                value={inputs.durationTo}
                sx={{ maxWidth: 80 }}
                onChange={ event => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#60;=</InputAdornment>,
                }}
              />
              <p>&nbsp;</p>
              <InputLabel sx={{ marginTop: 3 }}>distance between</InputLabel>
              <TextField
                id='distanceFrom'
                label='Distance >='
                name='distanceFrom'
                value={inputs.distanceFrom}
                sx={{ maxWidth: 80 }}
                onChange={ event => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#62;=</InputAdornment>,
                }}
              />
              <InputLabel sx={{ marginTop: 3 }}>and</InputLabel>
              <TextField
                id='distanceTo'
                label='Distance <='
                name='distanceTo'
                value={inputs.distanceTo}
                sx={{ maxWidth: 80 }}
                onChange={ event => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#60;=</InputAdornment>,
                }}
              />
            </Stack>
          </Grid>
          <Grid>
            <Stack spacing={3} flex >
              <Button data-testid="filterButton" variant='contained' size='large' sx={{ mt: 1, height:50 }}  onClick={handleSubmit}>Filter</Button>
              <Button data-testid="resetButton" variant='contained' size='large' sx={{ mt: 1, height:50 }}  onClick={handleReset}>Reset</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>

  )
}
export default TripFilter
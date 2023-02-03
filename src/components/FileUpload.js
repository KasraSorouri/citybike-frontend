import React, { useState, useRef } from 'react'
import fileService from '../servises/fileServise'
import UploadResults from './UploadResults'
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Box
}from '@mui/material'


const FileUpload = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [fileSelect, setFileSelect] = useState('trips')
  const [duplicationCheck, setDuplicationCheck] = useState('true')
  const inputRef = useRef(null)

  const tripChangeHandler = (event) => {
    setFile(event.target.files)
    setResult(null)
  }

  const tripUploadHandler = async() => {
    const response = await fileService.uploadTrips(file[0],duplicationCheck)
    inputRef.current.value = null
    if (response) {
      setFile(null)
      setResult(response)
    }
  }

  const stationChangeHandler = (event) => {
    setFile(event.target.files)
    setResult(null)
  }

  const stationUploadHandler = async() => {
    const response = await fileService.uploadStations(file[0], duplicationCheck)
    if (response) {
      setFile(null)
      inputRef.current.value = null

      setResult(response)
    }
  }

  const toggleHandleChange = (event, newSelection) => {
    setFileSelect(newSelection)
    setFile(null)
  }

  const duplicationToggleHandleChange = (event, newSelection) => {
    setDuplicationCheck(newSelection)
  }

  const UploadTrips = () => {
    return(
      <div>
        <h3>Please Choose the CSV file to upload TRIPS information.</h3>
        <input
          id='tripFile'
          type='file'
          ref={inputRef}
          accept=".csv"
          onChange={tripChangeHandler}
          style={{ display: 'none' }}
        />
        <label htmlFor='tripFile' style={{ borderStyle:'solid',
          borderRadius:5,
          padding: 6,
          paddingRight:80
        }}>{ file ? file[0].name : 'Click to Upload csv file for Trips' }</label>
        <Box sx={{ marginTop: 3 }}>
          <Stack direction={'row'} spacing={5}>
            <h3>recoed check for dublication?</h3>
            <ToggleButtonGroup
              color="primary"
              value={duplicationCheck}
              exclusive
              onChange={duplicationToggleHandleChange}
              aria-label="Platform"
            >
              <ToggleButton value='true' >Check</ToggleButton>
              <ToggleButton value='false'>No</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
        <Button onClick={tripUploadHandler} variant="contained" >
          Upload
        </Button>
        <br/>
      </div>
    )
  }

  const UploadStations = () => {
    return(
      <div>
        <h3>Please Choose the CSV file to upload STAIONS information.</h3>
        <input
          id='StationFile'
          type='file'
          ref={inputRef}
          accept=".csv"
          onChange={stationChangeHandler}
          style={{ display: 'none' }}
        />
        <label htmlFor='StationFile' style={{ borderStyle:'solid',
          borderRadius:5,
          padding: 6,
          paddingRight:60
        }}> { file ? file[0].name : 'Click to Upload csv file for Statoins' }
        </label>
        <Box sx={{ marginTop: 3 }}>
          <Stack direction={'row'} spacing={5}>
            <h3>recoed check for dublication?</h3>
            <ToggleButtonGroup
              color="primary"
              value={duplicationCheck}
              exclusive
              onChange={duplicationToggleHandleChange}
              aria-label="Platform"
            >
              <ToggleButton value='true' >Check</ToggleButton>
              <ToggleButton value='false'>No</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
        <Button onClick={stationUploadHandler} variant="contained" >
        Upload
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h3>Please choose what information you want to upload.</h3>
      <ToggleButtonGroup
        color="primary"
        value={fileSelect}
        exclusive
        onChange={toggleHandleChange}
        aria-label="Platform"
      >
        <ToggleButton value='trips'>Upload Trips</ToggleButton>
        <ToggleButton value='stations'>Upload Stations</ToggleButton>
      </ToggleButtonGroup>
      <br />
      { fileSelect === 'stations' ? <UploadStations /> : <UploadTrips /> }
      <UploadResults result={result} />
    </div>
  )

}

export default FileUpload
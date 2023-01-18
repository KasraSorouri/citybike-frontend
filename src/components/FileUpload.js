import React, { useState, useRef } from 'react'
import fileService from '../servises/fileServise'
import UploadResults from './UploadResults'
import {
  Button,
  ToggleButton,
  ToggleButtonGroup
}from '@mui/material'


const FileUpload = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [fileSelect, setFileSelect] = useState('trips')
  const [dublicationCheck, setDublicationCheck] = useState('true')
  const inputRef = useRef(null)

  const tripChangeHandler = (event) => {
    console.log('event ->', event.target.files[0])
    setFile(event.target.files)
    setResult(null)
  }

  const tripUploadHandler = async() => {
    const response = await fileService.uploadTrips(file[0],dublicationCheck)
    inputRef.current.value = null
    if (response) {
      setFile(null)
      setResult(response)
    }
  }

  const stationChangeHandler = (event) => {
    console.log('event ->', event.target.files[0],dublicationCheck)
    setFile(event.target.files)
    setResult(null)
  }

  const stationUploadHandler = async() => {
    const response = await fileService.uploadStations(file[0], dublicationCheck)
    if (response) {
      setFile(null)
      inputRef.current.value = null

      setResult(response)
    }
  }

  const toggleHandleChange = (event, newSelection) => {
    setFileSelect(newSelection)
  }

  const dublicationToggleHandleChange = (event, newSelection) => {
    setDublicationCheck(newSelection)
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
        }}> Click to Upload csv file for Trips</label>
        <p>recoed check for dublication?
          <ToggleButtonGroup
            color="primary"
            value={dublicationCheck}
            exclusive
            onChange={dublicationToggleHandleChange}
            aria-label="Platform"
          >
            <ToggleButton value='true' >Check</ToggleButton>
            <ToggleButton value='false'>No</ToggleButton>
          </ToggleButtonGroup>
        </p>
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
        }}> Click to Upload csv file for Statoins</label>
        <p>recoed check for dublication?
          <ToggleButtonGroup
            color="primary"
            value={dublicationCheck}
            exclusive
            onChange={dublicationToggleHandleChange}
            aria-label="Platform"
          >
            <ToggleButton value='true' >Check</ToggleButton>
            <ToggleButton value='false'>No</ToggleButton>
          </ToggleButtonGroup>
        </p>
        <Button onClick={stationUploadHandler} variant="contained" >
        Upload
        </Button>
        <UploadResults result={result} />
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
    </div>
  )

}

export default FileUpload
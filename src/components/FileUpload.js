import React, { useState, useRef } from 'react'
import fileService from '../servises/fileServise'
import UploadResults from './UploadResults'
import {
  Button,
}from '@mui/material'


const FileUpload = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  const tripChangeHandler = (event) => {
    console.log('event ->', event.target.files[0])
    setFile(event.target.files)
    setResult(null)
  }

  const tripUploadHandler = async() => {
    const response = await fileService.uploadTrips(file[0])
    if (response) {
      setFile(null)
      inputRef.current.value = null

      setResult(response)
    }
  }

  const stationChangeHandler = (event) => {
    console.log('event ->', event.target.files[0])
    setFile(event.target.files)
    setResult(null)
  }

  const stationUploadHandler = async() => {
    const response = await fileService.uploadTrips(file[0])
    if (response) {
      setFile(null)
      inputRef.current.value = null

      setResult(response)
    }
  }

  return (
    <div>
      <label>Trip File</label>
      <input
        id='tripFile'
        type='file'
        ref={inputRef}
        accept=".csv"
        onChange={tripChangeHandler}
        style={{ 'borderStyle':'solid',
          'borderRadius':'5px',
          'padding': '5px',
        }}
      />
      <Button onClick={tripUploadHandler} variant="contained" >
        Upload
      </Button>
      <br/>
      <br/>
      <label>Station File</label>
      <input
        id='StationFile'
        type='file'
        ref={inputRef}
        accept=".csv"
        onChange={stationChangeHandler}
        style={{ 'borderStyle':'solid',
          'borderRadius':'5px',
          'padding': '5px',
        }}
      />
      <Button onClick={stationUploadHandler} variant="contained" >
        Upload
      </Button>
      <UploadResults result={result} />
    </div>
  )

}

export default FileUpload
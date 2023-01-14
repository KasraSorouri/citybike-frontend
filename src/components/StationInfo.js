import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Map, Marker, ZoomControl  } from 'pigeon-maps'
import stationServices from '../servises/stationServices'
import { useLocation } from 'react-router-dom'



const StationInfo = (sid) => {
  const { state } = useLocation()
  const stationId = useParams(sid)
  const [stationData, setStationData] = useState({})
  useEffect(() =>  {
    console.log('station page sid ->', stationId)
    stationServices.getStationInfo({ stationId })
      .then((response) => setStationData(response))
  },[])
  console.log('Station ->', state.station)
  console.log('Station data ->', stationData)
  const station = state.station
  return(
    <div style={{ height: '100vh', width: '100%' }}>
      <h1>{station.nameFinnish} ({station.nameSwedish})</h1>
      <h3>{station.addressFinnish}  <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>&nbsp; capacity:  <span>{station.capacity} kpl</span></h3>
      <Map height={300} defaultCenter={[60.22,24.82]} defaultZoom={10}>
        <Marker width={30} anchor={[station.location.latitude, station.location.longtitude]} color='red' value='test' ></Marker>
        <ZoomControl />
      </Map>
    </div>
  )
}

export default StationInfo
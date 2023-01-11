import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import stationServices from '../servises/stationServices'


const StationInfo = (sid) => {
  const stationId = useParams(sid)
  const [stationData, setStationData] = useState({})
  useEffect(() =>  {
    async() => {
      const data = await stationServices.getStationInfo({ stationId })
      setStationData(data)
    }
  },[])
  console.log('Station data ->', stationData)

  return(
    <div>
      Station Info
      
    </div>
  )
}

export default StationInfo
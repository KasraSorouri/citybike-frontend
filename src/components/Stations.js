import React, { useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { initialize } from '../reducers/stationReducer'

const Stations = () => {
  const dispatch = useDispatch()
  useEffect(() => {dispatch(initialize())},[dispatch])

  const stations = useStore(state => state.stations)
  console.log('trips ->', stations)
  return(
    <div>
      Stations
    </div>
  )
}

export default Stations
import React, { useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { initialize } from '../reducers/tripReducer'

const Trips = () => {
  const dispatch = useDispatch()
  useEffect(() => {dispatch(initialize())},[dispatch])

  const trips = useStore(state => state.trips)
  console.log('trips ->', trips)
  return(
    <div>
      Trips
    </div>
  )
}

export default Trips
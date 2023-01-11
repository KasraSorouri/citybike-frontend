import { configureStore } from '@reduxjs/toolkit'
import tripReducer from './reducers/tripReducer'
import stationReducer from './reducers/stationReducer'

const store = configureStore({
  reducer:{
    trip: tripReducer,
    station: stationReducer
  }
})

export default store
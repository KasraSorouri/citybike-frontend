import { configureStore } from '@reduxjs/toolkit'
import tripReducer from './reducers/tripReducer'
import stationReducer from './reducers/stationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer:{
    trip: tripReducer,
    station: stationReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
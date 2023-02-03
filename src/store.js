import { configureStore } from '@reduxjs/toolkit'
import stationReducer from './reducers/stationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer:{
    station: stationReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
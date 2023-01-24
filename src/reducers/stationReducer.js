import { createSlice } from '@reduxjs/toolkit'
import stationServices from '../servises/stationServices'

const stationSlice = createSlice({
  name: 'station',
  initialState: [],
  reducers:{
    init(state, action) {
      return action.payload
    }
  }
})

export const { init } = stationSlice.actions

export const initialize = () => {
  return async dispatch => {
    const response = await stationServices.getStations()
    dispatch(init(response))
  }
}

export default stationSlice.reducer
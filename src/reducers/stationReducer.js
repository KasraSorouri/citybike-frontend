import { createSlice } from '@reduxjs/toolkit'
import stationServices from '../servises/stationServices'

const stationSlice = createSlice({
  name: 'station',
  initialState: { stations: [], totalStations: 0 },
  reducers:{
    init(state, action) {
      return action.payload
    }
  }
})

export const { init } = stationSlice.actions

export const initialize = ({ page, rowsPerPage }) => {
  return async dispatch => {
    const response = await stationServices.getStations({ page, rowsPerPage })
    dispatch(init(response))
  }
}

export default stationSlice.reducer
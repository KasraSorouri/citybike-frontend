import { createSlice } from "@reduxjs/toolkit"
import tripServices from '../servises/tripServices'

const tripSlice = createSlice({
    name: 'trip',
    initialState: [],
    reducers:{
        init(state, action) {
            return action.payload
        }
    }
})

export const { init } = tripSlice.actions

export const initialize = () => {
    return async dispatch => {
        const response = await tripServices.getTrips({ page:2, qty: 10 })
        dispatch(init(response))
    }
}

export default tripSlice.reducer
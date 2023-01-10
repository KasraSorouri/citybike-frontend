import { configureStore } from '@reduxjs/toolkit'
import tripReducer from './reducers/tripReducer'

const store = configureStore({
    reducer:{
        trip: tripReducer
    }
})

export default store
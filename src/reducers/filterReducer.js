import { createSlice } from '@reduxjs/toolkit'

const initialfilter = {
  originStation: 'null',
  destinationStation: 'null',
  durationFrom: 'null',
  durationTo: 'null',
  distanceFrom: 'null',
  distanceTo: 'null',
  start: 'null',
  end: 'null'

}
const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    search : {
      filter: initialfilter ,
      sort: {
        orderBy:'departure',
        order: 'desc'
      }
    }
  },
  reducers:{
    setFilterParams(state, action) {
      state.search.filter = action.payload
    },
    setOrderBy(state, action) {
      state.search.sort.orderBy = action.payload
    },
    setDirection(state, action) {
      state.search.sort.order = action.payload
    },
  }
})

export const { setFilterParams, setOrderBy, setDirection } = filterSlice.actions

export const setFilter = (filter) => {
  let params = {}
  params.originStation = filter.originStation ? filter.originStation : 'null'
  params.destinationStation = filter.destinationStation ? filter.destinationStation :'null'
  params.durationFrom = filter.durationFrom ? filter.durationFrom : 'null'
  params.durationTo = filter.durationTo ? filter.durationTo : 'null'
  params.distanceFrom = filter.distanceFrom ? filter.distanceFrom : 'null'
  params.distanceTo = filter.distanceTo ? filter.distanceTo : 'null'
  params.start = filter.start ? filter.start.toISOString() : 'null'

  //Given that the beginning of the day is taken into account when selecting the day.
  //we will add one day to it so that it can be considered in the filter.
  const theDayAfter = new Date(filter.end)
  theDayAfter.setDate(theDayAfter.getDate()+1)
  params.end = filter.end ? theDayAfter.toISOString() : 'null'

  return dispatch => {
    dispatch(setFilterParams(params))
  }
}

export const setSortBy = (sortBy) => {
  return dispatch => {
    dispatch(setOrderBy(sortBy))
  }
}

export const setSortDirection = (direction) => {
  return dispatch => {
    dispatch(setDirection(direction))
  }
}

export const resetFilter = () => {
  return dispatch => {
    dispatch(setFilterParams(initialfilter))
  }
}

export default filterSlice.reducer
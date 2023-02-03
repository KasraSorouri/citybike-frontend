import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { createSearchParams } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Box
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import TablePaginationActions from './tablePaginationActions'
import dateFormat from 'dateformat'
import TripFilter from './TripFilter'
import Togglable from './Togglable'
import tripServices from '../servises/tripServices'
import { setSortBy, setSortDirection } from '../reducers/filterReducer'

const TripfilterPage = () => {
  const dispatch = useDispatch()
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ trips, setTrips ] = useState()
  const [ totalTrips, setTotalTrips ] = useState()

  const filterParams =  useSelector(state => state.filter.search.filter)
  const sortPrams = useSelector(state => state.filter.search.sort)
  const allParams = { ...filterParams, ...sortPrams }
  let order = sortPrams.order
  let orderBy = sortPrams.orderBy

  useEffect(() => {
    let filterData = `${createSearchParams(allParams)}`
    tripServices.getFilterdTrips({ page, rowsPerPage, filterData })
      .then(response => {setTrips(response.trips)
        setTotalTrips(response.totalTrips)
      })},[page, rowsPerPage, sortPrams, filterParams])

  const columnHeader = [
    { id: 'departureStationName', lable: 'Departure Station', minWidth: 170 },
    { id: 'departure', lable: 'Departure Time', minWidth: 170 },
    { id: 'returnStationName', lable: 'Return Station', minWidth: 170 },
    { id: 'return', lable: 'Return Time', minWidth: 170 },
    { id: 'duration', lable: 'Duration (min)', minWidth: 30 },
    { id: 'distance', lable: 'Distance (Km)', minWidth: 30 }
  ]

  const filterHandler = async() => {
    setPage(0)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }

    return (
      <TableHead>
        <TableRow>
          {columnHeader.map((column) => (
            <TableCell
              key={column.id}
              align='center'
              style={{ minWidth: column.minWidth }}
              sortDirection={orderBy === column.id ? order : false }
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc' }
                onClick={createSortHandler(column.id)}
              >
                {column.lable}
                {orderBy === column.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    dispatch(setSortDirection(isAsc ? 'desc' : 'asc'))
    dispatch(setSortBy(property))
    setPage(0)
  }

  if (!trips){
    return null
  }

  return(
    <div>
      <h2>Trips information</h2>
      <Togglable buttonLabel='Filter'>
        <TripFilter filterHandler={ filterHandler } />
      </Togglable>
      <Paper>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label='sticky table'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { trips.map((trip) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={trip.id}>
                    <TableCell align='left' >
                      {trip.departureStationName}({trip.departureStationId})
                    </TableCell>
                    <TableCell align='center' >
                      {dateFormat(trip.departure,'dd.mm.yyyy  HH:MM')}
                    </TableCell>
                    <TableCell align='left' >
                      {trip.returnStationName}({trip.returnStationId})
                    </TableCell>
                    <TableCell align='center' >
                      {dateFormat(trip.return,'dd.mm.yyyy  HH:MM')}
                    </TableCell>
                    <TableCell align='center' >
                      {trip.duration.toFixed(0)}
                    </TableCell>
                    <TableCell align='center' >
                      {trip.distance.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10,50,100]}
          component='div'
          colSpan={3}
          count={totalTrips}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  )
}

export default TripfilterPage
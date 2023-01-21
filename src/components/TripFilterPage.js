import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import TablePaginationActions from './tablePaginationActions'

import dateFormat from 'dateformat'
import TripFilter from './TripFilter'
import Togglable from './Togglable'
import tripServices from '../servises/tripServices'

const TripfilterPage = () => {
  const filterData = useLocation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [ trips, setTrips] = useState()
  const [ totalTrips, setTotalTrips] = useState()

  useEffect(() => {tripServices.getFilterdTrips({ page, rowsPerPage, filterData })
    .then(response => {setTrips(response.trips)
      setTotalTrips(response.totalTrips)
    })},[page, rowsPerPage, filterData])

  //const trips = useSelector(state => state.trip.trips)
  //const totalTrips = useSelector(state => state.trip.totalTrips)

  const columnHeader = [
    { id: 'departureStation', lable: 'Departure Station', minWidth: 170 },
    { id: 'departureTime', lable: 'Departure Time', minWidth: 170 },
    { id: 'returnStation', lable: 'Return Station', minWidth: 170 },
    { id: 'returnTime', lable: 'Return Time', minWidth: 170 },
    { id: 'duration', lable: 'Duration (min)', minWidth: 30 },
    { id: 'distance', lable: 'Distance (Km)', minWidth: 30 }
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  if (!trips){
    return null
  }

  return(
    <div>
      <h2>Trips information</h2>
      <Togglable buttonLabel='Filter'>
        <TripFilter />
      </Togglable>
      <Paper>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columnHeader.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.lable}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { trips.map((trip) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={trip.id} onClick={() => console.log('roe clicked ->',trip.id) } >
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
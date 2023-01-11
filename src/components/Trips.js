import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow } from '@mui/material'
import dateFormat from 'dateformat'
import { initialize } from '../reducers/tripReducer'

const Trips = () => {
  const dispatch = useDispatch()
  useEffect(() => {dispatch(initialize())},[dispatch])

  const trips = useSelector(state => state.trip)
  console.log('trips ->', trips)

  const columnHeader = [
    { id: 'departureStation', lable: 'Departure Station', minWidth: 170 },
    { id: 'departureTime', lable: 'Departure Time', minWidth: 170 },
    { id: 'returnStation', lable: 'Return Station', minWidth: 170 },
    { id: 'returnTime', lable: 'Return Time', minWidth: 170 },
    { id: 'duration', lable: 'Duration (min)', minWidth: 30 },
    { id: 'distance', lable: 'Distance (Km)', minWidth: 30 }
  ]

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(30)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return(
    <div>
      Trips
      <Paper>
        <TableContainer>
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
                console.log('date ->', )
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
          rowsPerPageOptions={[30,50,100]}
          component='div'
          count={1000}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default Trips
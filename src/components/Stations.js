import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from '../reducers/stationReducer'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow } from '@mui/material'

const Stations = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(30)

  const dispatch = useDispatch()
  useEffect(() => {dispatch(initialize({ page, rowsPerPage }))},[page, rowsPerPage])

  const stations = useSelector(state => state.station.stations)
  const totalStations = useSelector(state => state.station.totalStations)

  console.log('stations ->', stations)

  const columnHeader = [
    { id: 'stationId', lable: 'Station ID', minWidth: 20 },
    { id: 'stationName', lable: 'Station Name', minWidth: 170 },
    { id: 'stationCapacity', lable: 'Station Capacity', minWidth: 30 },
    { id: 'stationAddress', lable: 'Station Address', minWidth: 200 },
    { id: 'stationPoint', lable: 'Show on Map', minWidth: 70 },
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return(
    <div>
      Stations
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
              { stations.map((station) => {
                console.log('date ->', )
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={station.id} onClick={() => console.log('roe clicked ->',station.id) } >
                    <TableCell align='center' >
                      {station.stationId}
                    </TableCell>
                    <TableCell align='left' >
                      {station.nameFinnish}
                    </TableCell>
                    <TableCell align='center' >
                      {station.capacity}
                    </TableCell>
                    <TableCell align='left' >
                      {station.addressFinnish}
                    </TableCell>
                    <TableCell align='center' >
                      {station.location.longtitude}
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
          count={totalStations}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default Stations
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

import TablePaginationActions from './tablePaginationActions'
import { useNavigate } from 'react-router-dom'

const Stations = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [stationsToShow, setStationsToShow] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())
  },[])

  const stations = useSelector(state => state.station)

  useEffect(() => {
    const LastStationIndex = (page + 1 ) * rowsPerPage
    const firstStationIndex = LastStationIndex - rowsPerPage
    setStationsToShow(stations.slice(firstStationIndex, LastStationIndex))
  }, [page, rowsPerPage, stations])

  const totalStations = stations ? stations.length : 0

  const columnHeader = [
    { id: 'stationId', lable: 'Station ID', minWidth: 20 },
    { id: 'stationName', lable: 'Station Name', minWidth: 170 },
    { id: 'stationCapacity', lable: 'Station Capacity', minWidth: 30 },
    { id: 'stationCity', lable: 'City', minWidth: 50 },
    { id: 'stationAddress', lable: 'Station Address', minWidth: 200 },
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
      <h2>Station information</h2>
      <Paper>
        <TableContainer sx={{ maxHeight: 600 }} >
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
              { stationsToShow.map((station) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={station.id} onClick={() => navigate(`/station/${station.id}`) } >
                    <TableCell align='center' >
                      {station.stationId}
                    </TableCell>
                    <TableCell align='left' >
                      {station.nameFinnish}
                    </TableCell>
                    <TableCell align='center' >
                      {station.capacity}
                    </TableCell>
                    <TableCell align='center' >
                      {station.cityFinnish}
                    </TableCell>
                    <TableCell align='left' >
                      {station.addressFinnish}
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
          count={totalStations}
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

export default Stations
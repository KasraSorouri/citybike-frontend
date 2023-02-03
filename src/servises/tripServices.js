import axios from 'axios'

const baseUri = '/api/trips'

const getTrips = async({ page, rowsPerPage }) => {
  const response = await axios.get(`${baseUri}/${page}/${rowsPerPage}` )
  return response.data
}

const getFilterdTrips = async({ page, rowsPerPage, filterData }) => {
  const response = await axios.get(`${baseUri}/${page}/${rowsPerPage}?${filterData}`)
  return response.data
}

export default {
  getTrips,
  getFilterdTrips
}
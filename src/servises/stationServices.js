import axios from 'axios'

const baseUri = 'http://localhost:3005/api/stations'

const getStations = async({ page, rowsPerPage }) => {
  const response = await axios.get(`${baseUri}/${page}/${rowsPerPage}`)
  return response.data
}

export default {
  getStations
}
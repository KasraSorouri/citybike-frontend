import axios from 'axios'

const baseUri = 'http://localhost:3005/api/trips'

const getTrips = async({ page, rowsPerPage }) => {
  const response = await axios.get(`${baseUri}/${page}/${rowsPerPage}` )
  return response.data
}

export default {
  getTrips
}
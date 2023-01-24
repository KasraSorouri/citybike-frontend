import axios from 'axios'

const baseUri = 'http://localhost:3005/api/stations'

const getStations = async() => {
  const response = await axios.get(baseUri)
  return response.data
}

const getStationInfo = async(stationId) => {
  const response = await axios.get(`${baseUri}/${stationId}`)
  return response.data
}

export default {
  getStations,
  getStationInfo,
}
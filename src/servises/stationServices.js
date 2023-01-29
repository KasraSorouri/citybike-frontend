import axios from 'axios'

const baseUri = 'http://localhost:3005/api/stations'

const getStations = async() => {
  const response = await axios.get(baseUri)
  return response.data
}

const getStationInfo = async(stationId) => {
  try {
    const response = await axios.get(`${baseUri}/${stationId}`)
    return response.data
  } catch (e){
    console.log('error:', e.message)
  }
}

export default {
  getStations,
  getStationInfo,
}
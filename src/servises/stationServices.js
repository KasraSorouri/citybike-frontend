import axios from 'axios'

const baseUri = 'http://localhost:3005/api/stations'

const getStations = async() => {
  const response = await axios.get(baseUri)
  return response.data
}

const getStationInfo = async(stationId, filterData) => {
  try {
    const response = await axios.get(`${baseUri}/${stationId}?${filterData}`)
    return response.data
  } catch (e){
    console.log('error:', e.message)
  }
}

export default {
  getStations,
  getStationInfo,
}
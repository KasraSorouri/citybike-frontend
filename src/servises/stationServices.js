import axios from 'axios'

//const baseUri = 'http://localhost:3005/api/stations'
const baseUri = 'http://localhost:3005/api/trips'

const getStations = async({ page, qty }) => {
  console.log('page ->', page , '  *** qty -> ',qty)
  const response = await axios.get(baseUri)
  return response.data
}

export default {
  getStations
}
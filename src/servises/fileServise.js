import axios from 'axios'

const baseUri = 'http://localhost:3005/api/files'

const uploadTrips = async(file) => {
  console.log('service file ->', file)
  const formData = new FormData()
  formData.append(
    'csvFile',
    file,
    file.name
  )
  const response = await axios.post(`${baseUri}/trip`,formData)
  console.log('response ->', response.data)
  return response.data
}

const uploadStations = async(file) => {
  console.log('service file ->', file)
  const formData = new FormData()
  formData.append(
    'csvFile',
    file,
    file.name
  )
  const response = await axios.post(`${baseUri}/station`,formData)
  console.log('response ->', response.data)
  return response.data
}

export default {
  uploadTrips,
  uploadStations
}
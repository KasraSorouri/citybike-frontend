import axios from 'axios'

const baseUri = 'http://localhost:3005/api/files'

const uploadTrips = async(file,dublicationCheck) => {
  const formData = new FormData()
  formData.append(
    'csvFile',
    file,
    file.name
  )
  formData.append('dublicateCheck', dublicationCheck)
  const response = await axios.post(`${baseUri}/trip`, formData)
  console.log('response ->', response.data)
  return response.data
}

const uploadStations = async(file,dublicationCheck) => {
  const formData = new FormData()
  formData.append(
    'csvFile',
    file,
    file.name
  )
  formData.append('dublicateCheck', dublicationCheck)
  const response = await axios.post(`${baseUri}/station`,formData)
  console.log('response ->', response.data)
  return response.data
}

export default {
  uploadTrips,
  uploadStations
}
import axios from 'axios'

const baseUri = '/api/files'

const uploadTrips = async(file,duplicateCheck) => {
  const formData = new FormData()
  formData.append(
    'csvFile',
    file,
    file.name
  )
  formData.append('duplicateCheck', duplicateCheck)
  const response = await axios.post(`${baseUri}/trip`, formData)
  return response.data
}

const uploadStations = async(file,duplicateCheck) => {
  const formData = new FormData()
  formData.append(
    'csvFile',
    file,
    file.name
  )
  formData.append('duplicateCheck', duplicateCheck)
  const response = await axios.post(`${baseUri}/station`,formData)
  return response.data
}

export default {
  uploadTrips,
  uploadStations
}
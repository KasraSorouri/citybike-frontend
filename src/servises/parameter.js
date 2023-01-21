import axios from 'axios'

const baseUri = 'http://localhost:3005/api/parameter'

const getParameter = async() => {
  const response = await axios.get(baseUri)
  return response.data
}

export default { getParameter }
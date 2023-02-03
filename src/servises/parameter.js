import axios from 'axios'

const baseUri = '/api/parameter'

const getParameter = async() => {
  const response = await axios.get(baseUri)
  return response.data
}

export default { getParameter }
import axios from 'axios'

export const getUpdates = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/api/update/list',
  })

  return data && data.code ? data : []
}

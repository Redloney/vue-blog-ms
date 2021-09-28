import axios from './axios'

export const getTags = async () => {
  const ret: any = await axios.get('/api/tag/list')
  return ret.data ? ret.data.tags : []
}

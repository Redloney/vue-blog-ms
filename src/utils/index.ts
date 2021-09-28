import storage from './storage'

export const getToken = () => {
  return storage.get('token')
}

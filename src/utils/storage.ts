class storage {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  get(key: string) {
    return localStorage.getItem(key)
  }
  del(key: string) {
    localStorage.removeItem(key)
  }
  cls() {
    localStorage.clear()
  }
}

export default new storage()

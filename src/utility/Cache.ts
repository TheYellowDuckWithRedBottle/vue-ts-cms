class LoacalStorage {
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return value || []
    }
  }
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, value)
  }

  removeCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LoacalStorage()

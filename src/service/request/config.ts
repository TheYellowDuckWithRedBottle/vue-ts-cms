let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://47.100.170.34/xinyi'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://47.100.170.34/xinyi'
}

export { BASE_URL, TIME_OUT }

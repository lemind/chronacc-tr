var port = process.env.PORT || 3001;

console.log('---NODE_ENV---', process.env.NODE_ENV)

export let API_HOST

if (process.env.NODE_ENV === 'development') {
  API_HOST = `http://localhost:${port}/api`
} else {
  API_HOST = `https://chronacc-tr.herokuapp.com/api`
}

export const HEADERS = {
  'Content-Type': 'application/json'
}

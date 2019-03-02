var port = process.env.PORT || 3001;

export const API_HOST = `http://localhost:${port}/api`;
//export const API_HOST = `http://0.0.0.0:${port}/api`;

//export const API_HOST = `https://chronacc-tr.herokuapp.com/api`;
// export const API_HOST = 'https://demo9163302.mockable.io/';

export const HEADERS = {
  'Content-Type': 'application/json'
}

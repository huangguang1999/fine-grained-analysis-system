import axios from 'axios'

export function login (userInfo) {
  const url = 'http://localhost:5000/api/users/login'

  const data = Object.assign({}, userInfo)

  return axios
    .post(url, data)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(err => {
      throw err
    })
}

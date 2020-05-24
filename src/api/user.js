import {request} from './index'

function login (body) {
  return request('/users/sign', body).then(response => response.data)
}

export default {
  login
}

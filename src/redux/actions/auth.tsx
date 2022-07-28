import axios from 'axios';

export function signup(signup_data: any) {
  return axios.post('/api/auth/signup', signup_data).then(res => {
    return res.data.success;
  });
}

export function signin(signin_data: any) {
  return axios.post('/api/auth/signin', signin_data).then(res => {
    return res.data;
  });
}

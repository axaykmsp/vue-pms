import axios from 'axios';

const API_URL = process.env.API_END_POINT;

class CommonService {
  charge(data) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    }
    axios.defaults.headers.common['Accept'] = 'application/json';
    return axios.post(API_URL + 'auth/charge', data).then(response => {
      return response.data;
    });
  }
}

export default new CommonService();
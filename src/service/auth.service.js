import axios from 'axios';

const API_URL = process.env.API_END_POINT;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'auth/login', user)
      .then(response => {
        console.log(response.data.data, 'response');
        if (response.data.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
    
        return response.data.data;
      }).catch(error => {
        console.log(error, 'error');
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
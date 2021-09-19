import axios from 'axios';

const API_URL = 'https://avwx-account-dev.azurewebsites.net/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register',
    {
      email: user.email,
      password: user.password
    },
    { 
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    }
    });
  }
  
  updateUser(user) {
    return axios.patch(API_URL + 'user',
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      },{ 
        headers: {
        'Authorization': 'Bearer ' + user.access_token
      }
      });
  }

  resetPassword(user) {
    return axios.post(API_URL + 'register/reset-password/'+ user.access_token,
      {
        password: user.new_password
      });
  }

  forgotPassword(user) {
    return axios.post(API_URL + 'register/forgot-password',
      {
        email: user.email
      },
      { 
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      }
    });
  }

  refreshToken(refresh_token) {
    return axios.post(API_URL + 'auth/refresh',
      { 
        headers: {
        'Authorization': 'Bearer ' + refresh_token,
      }
    });
  }
}

export default new AuthService();

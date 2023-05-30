import axios from 'axios';

const BASE_URL = 'http://localhost:8090'; // Replace with your actual API base URL

class UserService {
  getUserById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`);
  }

  getUserByUsername(username) {
    return axios.get(`${BASE_URL}/username/${username}`);
  }

  getUserByUsernamereg(username) {
    return axios.get(`${BASE_URL}/username/${username}`)
      .then(response => response.data)
      .catch(error => null);
  }

  getUserByEmail(email) {
    return axios.get(`${BASE_URL}/email/${email}`)
      .then(response => response.data)
      .catch(error => null);
  }

  registerUser(user) {
    return axios.post(`${BASE_URL}/register`, user);
  }
}

export default new UserService();

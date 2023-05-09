//vincentdelara
import axios from 'axios';

const BASE_URL = 'http://localhost:8090';

class UserService {
  getUserById(user_id) {
    return axios.get(`${BASE_URL}/user/${user_id}`);
  }

  getUserByUsername(username) {
    return axios.get(`${BASE_URL}/username/${username}`);
  }

  registerUser(user) {
    return axios.post(`${BASE_URL}/registerUser`, user);
  }
}

export default new UserService();

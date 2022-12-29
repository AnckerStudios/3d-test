import axios from "axios";


const API_URL = "http://localhost:8080/api/services/controller/user/";

class AuthService {
  

  

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
}
export function getCurRole() {
  return localStorage.getItem('role') === "ROLE_ADMIN";
}
export default new AuthService();
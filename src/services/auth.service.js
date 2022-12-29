import axios from "axios";

const API_URL = "http://localhost:8080/api/services/controller/user/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        console.log("resp",response.data);
        if (response.data.token && response.data.role) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("role", response.data.role);
          console.log(localStorage);
        }
        

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
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
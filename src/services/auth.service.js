import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/services/controller/user/";
const navigate = useNavigate();
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email: email,
        password: password
      })
      .then(function (response) {
        if (response.data.token && response.data.role) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("role", response.data.role);
          navigate("/home");
        }
        })
        .catch(function (error) {
            setCitys([{cityName:"testCity", countTopology: 2},{cityName:"testCity 2", countTopology: 5}]);
            setLoading(false);
            console.log(error);
        });

  }

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
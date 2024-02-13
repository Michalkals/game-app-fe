import axios from "axios";
import { useState } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8080/users/log-in",
        formData,
        {
          withCredentials: true,
        }
      );
      if (!data) {
        navigate("/signup");
      }
      navigate("/");
    } catch (error) {
      console.error("Error during Login: ", error);
    }
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input
            type="email"
            required
            value={formData.email}
            onChange={changeHandler}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            required
            value={formData.password}
            onChange={changeHandler}
          />
          <label>Password</label>
        </div>
        <button onClick={login}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

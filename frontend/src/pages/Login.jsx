import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;
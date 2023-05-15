import { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          username: email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      setIsError(true);
      console.log("Error logging in:", error);
    }
  };

  return (
    <div className={"loginForm"}>
      <h1 className={"heading"}>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {isError && <p className="errorText">Please try again...</p>}
      </form>
      <p className={"text"}>
        Don`t have an account? <span onClick={navigateToSignup}>Signup</span>
      </p>
    </div>
  );
};

export default Login;

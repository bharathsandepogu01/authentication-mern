import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      const response = await axios.post(
        "http://localhost:4000/signup",
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
      console.log("Error registering:", error);
    }
  };

  return (
    <div className={"signupForm"}>
      <h1 className={"heading"}>Signup</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Signup</button>
        {isError && <p className="errorText">Please try again...</p>}
      </form>
      <p className={"text"}>
        Already have an account? <span onClick={navigateToLogin}>Login</span>
      </p>
    </div>
  );
};

export default Signup;

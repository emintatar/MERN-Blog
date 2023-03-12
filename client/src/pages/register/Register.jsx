import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const newUser = {
      username,
      email,
      password,
    };

    try {
      const res = await axios.post("/api/auth/register", newUser);
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>

      <form onSubmit={handleSubmit} className="registerForm">
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>

      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      <span
        style={{
          color: "red",
          marginTop: "10px",
        }}
        className="registerError"
      >
        {error && "Something went wrong"}
      </span>
    </div>
  );
};

export default Register;

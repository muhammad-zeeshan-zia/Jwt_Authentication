import React, { useState } from 'react'
import axios from 'axios'
import '../Components/login.css'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const navigate=useNavigate();
  
    const handleRegister = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/register', { username, password });
          console.log("done");
          setMessage(response.data.message);
        } catch (error) {
          setMessage('Registration failed');
          console.log(error)
        }
      };
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/login', { username, password });
          setToken(response.data.token);
          navigate("/");
          localStorage.setItem("token",response.data.token);
        } catch (error) {
          setMessage('Login failed');
        }
      };
       
  return (
    <>
   <div className="auth-container">
  <h1>MERN Authentication</h1>
  <div className="form-group">
    <label htmlFor="username">Username:</label>
    <input type="text" id="username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)}  />
  </div>
  <div className="button-group">
    <button className="register-btn"onClick={handleRegister}>Register</button>
    <button className="login-btn"onClick={handleLogin}>Login</button>
  

  </div>
  <div className="message">
    <p>{message}</p>
  </div>
</div>

    </>
  )
}

export default Login
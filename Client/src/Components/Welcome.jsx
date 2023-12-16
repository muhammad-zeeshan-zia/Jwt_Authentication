import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../Components/welcome.css'
import { Button } from 'bootstrap';
const Welcome = () => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [auth, setAuth] = useState(false);
    const navigate=useNavigate();
  
    useEffect(() => {
      setToken(localStorage.getItem("token"));
    }, []);
  
    useEffect(() => {
      const handleWelcome = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/welcome', {
            headers: {
              Authorization: token,
            },
          });
         setAuth(true);
        } catch (error) {
        
        }
      };
      
      if (token) {
        handleWelcome();
      }
    }, [token]);
    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        window.location.reload();
      };
    return (
      <>
      
       
      <div className="container">
      {auth ? (
        
        <div><h1>Hello I am Zeeshan</h1>
        <div className="button-container">
            <button
              onClick={handleLogout}
            >
              Logout
            </button>
         
          </div>
        
        </div>

        
      ) : (
        <div>
          <h1>Login Required</h1>
    
          <div className="button-container">
            <button
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </button>
         
          </div>
        </div>
      )}
    </div>
       
      </>
    )
  }
  
  export default Welcome;
  
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Ensure this path is correct
import bikyImage from '../assets/bikyimage.png'; // Adjust the import path if necessary
import '../ButtonStyle.css'; // This is the import statement for your CSS file
import { LoginRequest } from '../logic/backend';
import { useDispatch } from 'react-redux';
import { getUserCredentials, setUserCredentials } from '../logic/cookie';


const Login = () => {
  const navigate = useNavigate();// Creating a navigation function using React Router
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });// Initializing state for user credentials
  const dispatch = useDispatch();// Initializing Redux dispatch function
  const [loginE, setLoginE] = useState("");// Initializing state for login error message
  // Function to handle input changes (updating email and password)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
    setLoginE("");// Clearing any previous error message
  };
  // Function to handle the login form submission

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const userAuth = await LoginRequest(credentials.email, credentials.password);      // Attempt to perform the login request
      setUserCredentials(userAuth);      // Set user credentials if login is successful
      if(getUserCredentials().token !== "") {
      navigate('/homepage');
      }
      setLoginE("Failed to login! Invalid nickname or passsword. (or both!)")      // Display an error message if login fails
    } catch (error) {
      console.error('Login failed:', error);
      setLoginE("Failed to login! Invalid nickname or passsword. (or both!)")      // Display an error message if login fails
    }
  };
  
  return (
    
    <div className="login-container">
      <div className='background'></div>
      <div className="login-form">
      <h6>CHIEF? IS IT REALLY YOU?</h6>
        <h2>Log In to your Account</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            name="email" 
            placeholder="Nickname" 
            value={credentials.email} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={credentials.password} 
            onChange={handleInputChange} 
            required 
            style={{ marginBottom: loginE !== '' ? '1px' : '20px' }} // Adjust the values as needed

          />
          {loginE && <p className="error-message">{loginE}</p>} {/* Display error message if passwords do not match */}

          {/*
              <div className="form-options">
              <Link className="forgot-password-link" to="/forgot-password">Forgot Password?</Link>
          </div>

  */}

          <button type="submit" className="continue-button generic-btn">CONTINUE</button>
          <div className="alternative-options">
            {/*
            <button  type="button" onClick={() => navigate('/homepage')} className="visitor-button generic-btn">
              Be Visitor and Just Look!
            </button>
            */}

            <div className="or-divider">
              <span>Or</span>
            </div>
          </div>
        </form>
        <p className="signup-link">
          First Timer? <Link to="/register">SIGN UP HERE</Link>
        </p>
      </div>
      <div className="branding-container">
        <img src={bikyImage} alt="biky" className="biky-image" />
        <h1>Don't be an engineer,<br /> socialize with biky.</h1>
        <p><strong>Tired of just posting on confession pages? Can't find something you lost at Bilkent University? Or, do you wish to socialize even when classes are in full swing? Biky is your go-to platform!</strong></p>
      </div>
      
    </div>
  );
};

export default Login;
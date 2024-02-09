import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      console.log(response.data);
      history.push('/course');

    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <div className='links'>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
      <div className="links">
        <Link to="/">Register</Link>
      </div>
    </div>
  );
};

export default Login;

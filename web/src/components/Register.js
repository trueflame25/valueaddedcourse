import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const Register = () => {
  const history = useNavigate();
 const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username,
        email,
        password,
      });
      console.log(response.data);
      history.push('/course');

    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <div className='links'>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={handleChange}
            />
          </div>
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
          <button type='submit'>Register</button>
        </form>
      </div>
      <div className='links'>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Register;

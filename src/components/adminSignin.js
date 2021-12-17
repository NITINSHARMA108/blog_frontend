import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const AdminSignin = function () {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUserdata((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin_signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      });
      const res = await response.json();
      if (res) {
        navigate('/admin');
      } else {
        console.log('error');
      }
    } catch (err) {
      navigate('/admin_signin');
    }
  };
  return (
    <div className="container">
      <Link to="/"><button type="button" className="btn btn-success mb-4">Home</button></Link>
      <h1>Sign In</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="username" value={userdata.username} onChange={(e) => handleChange(e)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="username">Password</label>
          <input type="password" name="password" placeholder="password" value={userdata.password} onChange={(e) => handleChange(e)} className="form-control" />
        </div>

        <p>
          <small>
            Dont&quot;t have an account ?
            <Link to="/admin_signup">Sign Up</Link>
          </small>
        </p>
        <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Login</button>
      </form>
    </div>
  );
};

export default AdminSignin;

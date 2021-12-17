import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const AdminSignup = function () {
  const [userdata, setUserdata] = useState({
    username: '',
    password: '',
    passcode: '',
  });
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/admin_signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata),
    });
    const res = await response.json();
    if (res.status > 400) {
      console.log(res.message);
    } else {
      navigate('/');
    }
  };
  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUserdata((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className="container">
      <Link to="/"><button type="button" className="btn btn-success mb-4">Home</button></Link>
      <h1>Sign Up</h1>
      <div className="row">

        <form className="col-12 col-sm-12 col-md-8">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="username" name="username" id="username" value={userdata.username} onChange={(e) => handleChange(e)} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input type="password" placeholder="password" name="password" id="password" value={userdata.password} onChange={(e) => handleChange(e)} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="passcode">passcode</label>
            <input type="password" placeholder="passcode" name="passcode" id="passcode" value={userdata.passcode} onChange={(e) => handleChange(e)} className="form-control" />
          </div>
          <button className="btn btn-primary" type="button" onClick={(e) => handleSignup(e)}>Sign Up</button>
          <p>
            <small>
              Already Have an Account ?

              <Link to="/admin_signin">Sign In</Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;

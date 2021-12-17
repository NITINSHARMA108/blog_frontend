import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = function () {
  return (
    <div>
      <nav className="d-flex justify-content-center m-3">
        <div>
          <h1>Blogs</h1>
        </div>
        <ul>
          <Link to="/"><button className="btn btn-success ml-3" type="button">Home</button></Link>
          <Link to="/admin_signin"><button className="btn btn-success ml-3" type="button">SignIn as Admin</button></Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

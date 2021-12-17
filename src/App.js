import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AdminSignin from './components/adminSignin';
import AdminSignup from './components/adminSignup';
import Navbar from './components/Navbar';
import CreateBlog from './components/createBlog';
import BlogPost from './components/BlogPost';

const App = function () {
  return (

    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<Home />} />
          <Route exact path="/admin_signup" element={<AdminSignup />} />

          <Route exact path="/admin_signin" element={<AdminSignin />} />
          <Route exact path="/admin/createBlog" element={<CreateBlog />} />
          <Route exact path="/posts/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
};

export default App;

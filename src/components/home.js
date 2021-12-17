import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import Navbar from './Navbar';

const Home = function () {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      const res = await response.json();
      if (!res) {
        console.log('error in fetching api');
      } else {
        console.log(res);
        setBlogs(res.blogs);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="blogs">
        {blogs.map((blog) => <Blog blog={blog} />)}

      </div>
    </>
  );
};

export default Home;

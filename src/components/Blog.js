import React from 'react';
import { Link } from 'react-router-dom';

const Blog = function ({ blog }) {
  return (
    <div className="blog">
      <h1>{blog.title}</h1>

      <p>{blog.date}</p>
      <Link to={`/posts/${blog._id}`} state={{ blogs: blog }}><button type="button" className="btn btn-light">Read More</button></Link>
    </div>
  );
};

export default Blog;

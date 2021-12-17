import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

const BlogPost = function () {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogs } = location.state;
  const [comment, setcomment] = useState({
    name: '',
    comment: '',
  });
  console.log(blogs);
  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setcomment((c) => ({ ...c, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/post_comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: blogs._id,
          name: comment.name,
          comment: comment.comment,
        }),
      });
      const res = await response.json();
      if (res) {
        console.log(res);
        setcomment({ name: '', comment: '' });
      } else {
        console.log(res);
      }
    } catch (err) {
      navigate('/');
    }
  };
  return (
    <div className="container d-flex flex-column w-50">
      <h1>{blogs.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogs.content }} />

      <p>
        Publishing Date:
        {blogs.formal_date}
      </p>
      <h2>Post a Comment:</h2>
      <form className="d-flex flex-column align-items-start">

        <input type="text" name="name" placeholder="name" className="form-control mb-1 w-50" value={comment.name} onChange={(e) => handleChange(e)} />
        <input type="text" name="comment" placeholder="comment" className="form-control mb-1 w-50" value={comment.comment} onChange={(e) => handleChange(e)} />
        <button type="button" className="btn btn-success" onClick={(e) => handleSubmit(e)}>Submit</button>

      </form>
      <h2>Comments</h2>
      {blogs.comments.map((c) => (
        <div>
          <h4>{c.name}</h4>
          <p>{c.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPost;

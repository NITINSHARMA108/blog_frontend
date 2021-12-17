import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router';

const CreateBlog = function () {
  const [isAdmin, setisAdmin] = useState(false);
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [blogdata, setBlogdata] = useState({
    title: '',
    status: 'Unpublished',
  });
  const checkauthenticity = async () => {
    try {
      const response = await fetch('http://localhost:5000/check_authentication', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      console.log(res);
      if (res.status === 200) {
        setisAdmin(true);
        console.log('hello');
      } else {
        console.log('no-hello');
        navigate('/admin_signin');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async (e) => {
    console.log(blogdata, content);
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create_blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: blogdata.title,
          content,
          status: blogdata.status,
        }),
      });
      const res = await response.json();
      if (res) {
        console.log(res);
      } else {
        navigate('/admin_signin');
      }
    } catch (err) {
      navigate('/admin_signin');
    }
  };
  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setBlogdata((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    checkauthenticity();
  }, []);
  return (

    <div className="container">
      <div className="row">
        <form className="col-12 col-sm-12 col-md-8 offset-2">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" placeholder="title" value={blogdata.title} onChange={(e) => handleChange(e)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Content</label>
            <Editor
              initialValue={blogdata.content}
              apiKey="wkni7qt9evka91wfv3agsl0nrwxxfo231tetqdykyc8k2jsg"
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image',
                  'charmap print preview anchor help',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste wordcount',
                ],
                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help',

              }}
              onEditorChange={(newdata) => setContent(newdata)}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" className="form-control" onChange={e => handleChange(e)}>
              <option value="Unpublished">Unpublished</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <button className="btn btn-primary" type="button" onClick={(e) => onSubmit(e)}>Create Blog</button>
        </form>
      </div>

    </div>
  );
};

export default CreateBlog;

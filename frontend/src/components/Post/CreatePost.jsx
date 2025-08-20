import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const CreatePost = () => {
  const [comment, setComment] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    
    if (comment.trim() === '') {
      Swal.fire({
        title: 'Validation Error',
        text: 'The opinion field cannot be empty.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if(comment.trim().length>350){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Character limit exceed..350 characters only.",
       

      });
      return ;
    }

    const postData = { "post_content": comment };
    const url = "http://127.0.0.1:8000/api/posts/";

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        title: 'Success!',
        text: 'Your opinion has been posted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setComment(''); 
    })
    .catch((error) => {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error posting your opinion.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  const textareaStyle = {
    backgroundColor: '#2b3a52',
    color: '#d6d663',
    width: '100%',
    height: '150px', 
    boxSizing: 'border-box',
    resize: 'none', 
    padding: '10px', 
    position: 'relative' 
  };

  const counterStyle = {
    position: 'absolute',
    bottom: '10px', 
    right: '10px', 
    color: '#d6d663',
    fontSize: '12px' 
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form onSubmit={handleFormSubmit} className="w-50">
        <div className="form-group">
          <label htmlFor="opinion">
            <h1 className="c-primary">Write opinion anonymonusly</h1>
            <hr />
          </label>
          <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <textarea
            className="form-control"
            id="opinion"
            rows="3"
            style={textareaStyle}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        ></textarea>
      <div style={counterStyle}>{comment.length} / 350</div>
        </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
          <input className="btn btn-primary btn-lg w-20" type="submit" value="Post" />
        </div>
      </form>
    </div>
  );
}

export default CreatePost;

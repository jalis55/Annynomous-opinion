import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import api from '../../api/axios';

const CreatePost = () => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === '') {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please share your opinion before posting.',
        icon: 'warning',
        confirmButtonText: 'OK',
        background: '#2b3a52',
        color: '#ffffff'
      });
      return;
    }

    if (comment.trim().length > 350) {
      Swal.fire({
        icon: "error",
        title: "Character Limit Exceeded",
        text: "Please keep your opinion under 350 characters.",
        background: '#2b3a52',
        color: '#ffffff'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = { "post_content": comment.trim() };

      // content checking API call

      const apiUrl = "/genai/post/checker/";

      const apiResponse = await api.post(apiUrl, { content: comment.trim() });

      const apiResult = apiResponse.data;
      console.log(apiResult.data.accepted);
      console.log(apiResult.data.sentiment);

      if (!apiResult.data.accepted) {
        Swal.fire({
          title: 'Content Rejected',
          text: 'Your opinion contains inappropriate content and cannot be posted.',
          icon: 'error',
          confirmButtonText: 'OK',
          background: '#2b3a52',
          color: '#ffffff',
          confirmButtonColor: '#e74c3c'
        });
        setIsSubmitting(false);
        return;
      }

      // Post submission API call

      const url = "/api/posts/";

      const response = await api.post(url, postData);

      // axios throws on non-2xx so we don't need manual check unless we want specific validation

      await response.data;

      Swal.fire({
        title: 'Success!',
        text: 'Your opinion has been posted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#2b3a52',
        color: '#ffffff',
        confirmButtonColor: '#4a5fc1'
      });

      setComment('');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error posting your opinion. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        background: '#2b3a52',
        color: '#ffffff',
        confirmButtonColor: '#e74c3c'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNearLimit = comment.length > 300;
  const isOverLimit = comment.length > 350;

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ede2e2f2 0%, #092e69ff 100%)',
    padding: '20px'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    maxWidth: '600px',
    width: '100%'
  };

  const textareaStyle = {
    backgroundColor: 'rgba(43, 58, 82, 0.8)',
    color: '#f8f9fa',
    border: '2px solid rgba(214, 214, 99, 0.3)',
    borderRadius: '12px',
    fontSize: '16px',
    lineHeight: '1.5',
    transition: 'all 0.3s ease',
    resize: 'none',
    padding: '1rem',
    width: '100%',
    height: '150px'
  };

  const counterStyle = {
    color: isOverLimit ? '#e74c3c' : isNearLimit ? '#f39c12' : '#d6d663',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  };

  const submitButtonStyle = {
    background: 'linear-gradient(135deg, #4a5fc1 0%, #6c5ce7 100%)',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 40px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    opacity: isSubmitting ? 0.7 : 1
  };

  return (
    <div style={containerStyle} className="d-flex justify-content-center align-items-center">
      <div style={cardStyle}>
        <form onSubmit={handleFormSubmit}>
          <div className="text-center mb-4">
            <h1 style={{
              color: '#d6d663',
              fontSize: '2.5rem',
              fontWeight: '300',
              marginBottom: '0.5rem'
            }}>
              Share Your Thoughts
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
              marginBottom: '0'
            }}>
              Express yourself anonymously
            </p>
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #d6d663, transparent)',
              margin: '1.5rem auto',
              width: '100px'
            }}></div>
          </div>

          <div className="form-group mb-4">
            <div style={{ position: 'relative' }}>
              <textarea
                className="form-control"
                id="opinion"
                rows={6}
                style={{
                  ...textareaStyle,
                  borderColor: isOverLimit ? '#e74c3c' : isNearLimit ? '#f39c12' : 'rgba(214, 214, 99, 0.3)'
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What's on your mind? Share your thoughts anonymously..."
                disabled={isSubmitting}
              />
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                background: 'rgba(43, 58, 82, 0.9)',
                padding: '4px 8px',
                borderRadius: '12px'
              }}>
                <span style={counterStyle}>
                  {comment.length} / 350
                </span>
              </div>
            </div>

            {isOverLimit && (
              <div style={{
                color: '#e74c3c',
                fontSize: '14px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <i className="fas fa-exclamation-circle"></i>
                Character limit exceeded
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn"
              style={submitButtonStyle}
              disabled={isSubmitting || comment.trim() === '' || isOverLimit}
              onMouseOver={(e) => {
                if (!isSubmitting && !isOverLimit && comment.trim() !== '') {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(106, 90, 205, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Posting...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i>
                  Post Opinion
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import api from '../../api/axios';
import './CreatePost.css';

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


  return (
    <div className="cp-container d-flex justify-content-center align-items-center">
      <div className="cp-card">
        <form onSubmit={handleFormSubmit}>
          <div className="text-center mb-4">
            <h1 className="cp-title">
              Share Your Thoughts
            </h1>
            <p className="cp-subtitle">
              Express yourself anonymously
            </p>
            <div className="cp-divider"></div>
          </div>

          <div className="form-group mb-4">
            <div style={{ position: 'relative' }}>
              <textarea
                className={`cp-textarea form-control ${isOverLimit ? 'over-limit' : isNearLimit ? 'near-limit' : ''}`}
                id="opinion"
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What's on your mind? Share your thoughts anonymously..."
                disabled={isSubmitting}
              />
              <div className="cp-counter-wrap">
                <span className={`cp-counter ${isOverLimit ? 'over-limit' : isNearLimit ? 'near-limit' : ''}`}>
                  {comment.length} / 350
                </span>
              </div>
            </div>

            {isOverLimit && (
              <div className="cp-error-msg">
                <i className="fas fa-exclamation-circle"></i>
                Character limit exceeded
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="cp-submit-btn btn"
              disabled={isSubmitting || comment.trim() === '' || isOverLimit}
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
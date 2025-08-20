import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

const PostCardReply = ({ id, img }) => {
    const textAreaRef = useRef(null);
    const [textAreaVal, setTextAreaVal] = useState("");
    const [replies, setReplies] = useState([]);
    const [showInput, setInput] = useState(false);
    const [showHideReply, setShowHideReply] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // fetch previous comments when the component mounts
        const url = `http://127.0.0.1:8000/api/post/comments/${id}/`;
        setLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ensure data is an array
                if (Array.isArray(data)) {
                    setReplies(data);
                
                } else if (data && Array.isArray(data.comments)) {
                    // Handle nested comments array
                    setReplies(data.comments);
                } else {
                    // If data is not an array, set empty array
                    console.warn('API response is not an array:', data);
                    setReplies([]);
                }
                setShowHideReply(data.length > 0);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
                setReplies([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleCancelButton = (e) => {
        setTextAreaVal('');
        setInput((prev) => !prev);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [textAreaVal]);

    const handleReply = (e) => {
        e.preventDefault();
        const post_id = e.target.value;
        const postData = { "comment_content": textAreaVal, "post": post_id };
        const url = `http://127.0.0.1:8000/api/comments/add/`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
               
                Swal.fire({
                    title: 'Success!',
                    text: 'Your opinion has been posted successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setTextAreaVal('');
                setShowHideReply(true);
                // Add new reply to the beginning of the array
                setReplies(prevReplies => [data, ...prevReplies]);
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

    if (loading) {
        return <div>Loading comments...</div>;
    }

    if (error) {
        return <div>Error loading comments: {error}</div>;
    }

    return (
        <>
            <div className="comment-actions">
                <button className="comment-reply" onClick={() => setInput((prev) => !prev)}>
                    Reply
                </button>
            </div>
            
            <div className={`reply-wrapper${showInput ? ' reply-wrapper-show' : ''}`}>
                <div className="reply-input">
                    <div className="reply-avatar">
                        <img src={img} alt="Avatar" />
                    </div>
                    <textarea 
                        name="" 
                        id="" 
                        placeholder='Add a reply...' 
                        value={textAreaVal} 
                        onChange={(e) => setTextAreaVal(e.target.value)} 
                        rows={1} 
                        ref={textAreaRef}
                    ></textarea>
                </div>
                <div className='reply-button mt-2 row justify-content-end'>
                    <button className='btn btn-secondary btn-sm' onClick={handleCancelButton}>
                        Cancel
                    </button>
                    <button 
                        className={`btn btn-primary btn-sm ml-3 ${textAreaVal === '' ? ' disabled' : ''}`} 
                        value={id} 
                        onClick={textAreaVal === '' ? null : handleReply}
                        disabled={textAreaVal === ''}
                    >
                        Reply
                    </button>
                </div>
            </div>
             
            {/* show comments of this post */}
            <div className='show-comment'>
                {replies.length > 0 && (
                    <button className='view-comment' onClick={() => setShowHideReply((val) => !val)}>
                        {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                    </button>
                )}
                
                {replies.length > 0 && showHideReply && replies.map((reply, index) => (
                    <div className="comment-item" key={reply.id || index}>
                        <div className="comment-content">
                            <img src={img} alt="avatar" />
                            <div>{reply.comment_content}</div>
                        </div>
                    </div>
                ))}
                
                {replies.length === 0 && !loading && (
                    <div className="no-comments">No replies yet</div>
                )}
            </div>
        </>
    );
};

export default PostCardReply;
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import useWebSocket from 'react-use-websocket';
import api from '../../api/axios';

const PostCardReply = ({ id, img }) => {
    const textAreaRef = useRef(null);
    const [textAreaVal, setTextAreaVal] = useState("");
    const [replies, setReplies] = useState([]);
    const [showInput, setInput] = useState(false);
    const [showHideReply, setShowHideReply] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch existing comments on mount
    useEffect(() => {
        const url = `/api/post/comments/${id}/`;
        setLoading(true);
        api.get(url)
            .then(response => response.data)
            .then(data => {
                let comments = [];
                if (Array.isArray(data)) {
                    comments = data;
                } else if (data && Array.isArray(data.comments)) {
                    comments = data.comments;
                } else {
                    console.warn('API response is not an array:', data);
                }
                setReplies(comments);
                setShowHideReply(comments.length > 0);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
                setReplies([]);
            })
            .finally(() => setLoading(false));
    }, [id]);

    // Real-time WebSocket scoped to this post
    const WS_URL = `ws://127.0.0.1:8000/ws/post/${id}/`;
    const { lastMessage } = useWebSocket(WS_URL, { shouldReconnect: () => true });

    useEffect(() => {
        if (lastMessage !== null) {
            const newComment = JSON.parse(lastMessage.data);
            setReplies(prev => {
                const alreadyExists = prev.some(r => r.id === newComment.id);
                if (alreadyExists) return prev;
                return [newComment, ...prev];
            });
            setShowHideReply(true);
        }
    }, [lastMessage]);

    const handleCancelButton = () => {
        setTextAreaVal('');
        setInput(prev => !prev);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [textAreaVal]);

    const handleReply = async (e) => {
        e.preventDefault();
        const post_id = e.target.value;

        setIsSubmitting(true);

        try {
            // Step 1: AI moderation check (same as CreatePost)
            const moderationResponse = await api.post('/genai/post/checker/', {
                content: textAreaVal.trim()
            });
            const moderationResult = moderationResponse.data;

            if (!moderationResult.data.accepted) {
                Swal.fire({
                    title: 'Reply Rejected',
                    text: 'Your reply contains inappropriate content and cannot be posted.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            // Step 2: Submit the comment
            const data = await api.post('/api/comments/add/', {
                comment_content: textAreaVal,
                post: post_id
            }).then(r => r.data);

            Swal.fire({
                title: 'Success!',
                text: 'Your reply has been posted!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setTextAreaVal('');
            setInput(false);
            setShowHideReply(true);

            // Optimistic update — WS dedup will skip it if it arrives
            setReplies(prev => {
                const alreadyExists = prev.some(r => r.id === data.id);
                if (alreadyExists) return prev;
                return [data, ...prev];
            });

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error posting your reply.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>Error loading comments: {error}</div>;

    return (
        <>
            <div className="comment-actions">
                <button className="comment-reply" onClick={() => setInput(prev => !prev)}>
                    Reply
                </button>
            </div>

            <div className={`reply-wrapper${showInput ? ' reply-wrapper-show' : ''}`}>
                <div className="reply-input">
                    <div className="reply-avatar">
                        <img src={img} alt="Avatar" />
                    </div>
                    <textarea
                        placeholder='Add a reply...'
                        value={textAreaVal}
                        onChange={(e) => setTextAreaVal(e.target.value)}
                        rows={1}
                        ref={textAreaRef}
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                <div className='reply-button mt-2 row justify-content-end'>
                    <button
                        className='btn btn-secondary btn-sm'
                        onClick={handleCancelButton}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        className={`btn btn-primary btn-sm ml-3${(textAreaVal === '' || isSubmitting) ? ' disabled' : ''}`}
                        value={id}
                        onClick={textAreaVal === '' || isSubmitting ? null : handleReply}
                        disabled={textAreaVal === '' || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-1" role="status" />
                                Checking...
                            </>
                        ) : 'Reply'}
                    </button>
                </div>
            </div>

            <div className='show-comment'>
                {replies.length > 0 && (
                    <button className='view-comment' onClick={() => setShowHideReply(val => !val)}>
                        {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                    </button>
                )}

                {replies.length > 0 && showHideReply && replies.map((reply, index) => (
                    <div className="comment-item" key={reply.id ?? index}>
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
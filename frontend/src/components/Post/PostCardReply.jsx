import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import useWebSocket from 'react-use-websocket';
import api from '../../api/axios';
import './PostCardReply.css';

const PostCardReply = ({ id, img }) => {
    const textAreaRef = useRef(null);
    const [textAreaVal, setTextAreaVal] = useState("");
    const [replies, setReplies] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInput, setInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showHideReply, setShowHideReply] = useState(false);

    // 1. Fetch existing comments on mount
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(`/api/comments/${id}/`);
                const comments = response.data.comments || [];
                setReplies(comments);
                if (comments.length > 0) setShowHideReply(true);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [id]);

    // 2. WebSocket — receive new comments in real time
    const WS_URL = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:8000/ws/post/${id}/`;

    useWebSocket(WS_URL, {
        onMessage: (event) => {
            const data = JSON.parse(event.data);
            if (data.parent) {
                // Nested reply — attach under parent comment
                setReplies(prev => prev.map(c =>
                    c.id === data.parent
                        ? { ...c, replies: [data, ...(c.replies || [])] }
                        : c
                ));
            } else {
                // Top-level comment
                setReplies(prev => {
                    const alreadyExists = prev.some(r => r.id === data.id);
                    if (alreadyExists) return prev;
                    return [data, ...prev];
                });
            }
            setShowHideReply(true);
        },
        shouldReconnect: () => true,
    });

    // 3. Auto-resize textarea
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }, [textAreaVal]);

    const handleCancelButton = () => {
        setTextAreaVal('');
        setInput(false);
        setReplyingTo(null);
    };

    // 4. Submit — moderation check then POST; WebSocket handles state update
    const handleReply = async (parentId = null) => {
        if (!textAreaVal.trim()) return;
        setIsSubmitting(true);
        try {
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

            await api.post('/api/comments/add/', {
                comment_content: textAreaVal,
                post: id,
                parent: parentId
            });

            // Clear input — WebSocket onMessage will update replies state
            setTextAreaVal('');
            setInput(false);
            setReplyingTo(null);

            Swal.fire({
                title: 'Success!',
                text: 'Your reply has been posted!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error('Error:', err);
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

    // 5. Comment item — recursive for nested replies
    const CommentItem = ({ comment, isNested = false }) => (
        <div className={`pc-comment-item${isNested ? ' nested' : ''}`}>
            <img className="pc-comment-avatar" src={img} alt="avatar" />
            <div className="pc-comment-body">
                <div className="pc-bubble">{comment.comment_content}</div>
                {!isNested && (
                    <div className="pc-comment-meta">
                        <button
                            className="pc-reply-link"
                            onClick={() => {
                                setReplyingTo(comment.id);
                                setInput(true);
                                setTextAreaVal('');
                                setTimeout(() => textAreaRef.current?.focus(), 50);
                            }}
                        >
                            Reply
                        </button>
                    </div>
                )}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="pc-nested-replies">
                        {comment.replies.map(nestedReply => (
                            <CommentItem key={nestedReply.id} comment={nestedReply} isNested={true} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    if (loading) return (
        <div className="pc-loading">
            <span className="pc-spinner" style={{ borderColor: '#ddd', borderTopColor: '#1877f2' }} />
            Loading comments…
        </div>
    );

    if (error) return <div className="pc-error">⚠ Error loading comments: {error}</div>;

    return (
        <div className="pc-reply-root">

            {/* Comment toggle button */}
            <div className="comment-actions">
                <button
                    className="pc-comment-btn"
                    onClick={() => {
                        setInput(prev => !prev);
                        setReplyingTo(null);
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Comment
                </button>
            </div>

            {/* Input panel */}
            <div className={`pc-input-panel${showInput ? ' open' : ''}`}>

                {/* Replying-to badge */}
                {replyingTo && (
                    <div className="pc-replying-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 14 4 9 9 4" />
                            <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                        </svg>
                        Replying to comment
                        <button
                            onClick={() => setReplyingTo(null)}
                            style={{
                                background: 'none', border: 'none', color: '#1877f2',
                                cursor: 'pointer', fontSize: '14px', padding: '0 0 0 2px',
                                fontWeight: 700, lineHeight: 1
                            }}
                            title="Cancel reply"
                        >×</button>
                    </div>
                )}

                <div className="pc-input-row">
                    <img className="pc-avatar" src={img} alt="Avatar" />
                    <div className="pc-textarea-wrap">
                        <textarea
                            className="pc-textarea"
                            placeholder={replyingTo ? 'Write a reply…' : 'Add a comment…'}
                            value={textAreaVal}
                            onChange={(e) => setTextAreaVal(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey && textAreaVal.trim()) {
                                    e.preventDefault();
                                    handleReply(replyingTo);
                                }
                            }}
                            rows={1}
                            ref={textAreaRef}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="pc-actions-row">
                    <button
                        className="pc-btn-cancel"
                        onClick={handleCancelButton}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        className="pc-btn-post"
                        onClick={() => handleReply(replyingTo)}
                        disabled={textAreaVal.trim() === '' || isSubmitting}
                    >
                        {isSubmitting ? (
                            <><span className="pc-spinner" />Checking…</>
                        ) : (
                            <>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                                {replyingTo ? 'Reply' : 'Post'}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Comments list */}
            <div className="pc-comments-section">
                {replies.length > 0 && (
                    <button
                        className="pc-view-btn"
                        onClick={() => setShowHideReply(val => !val)}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            {showHideReply
                                ? <polyline points="18 15 12 9 6 15" />
                                : <polyline points="6 9 12 15 18 9" />
                            }
                        </svg>
                        {replies.length} {replies.length === 1 ? 'comment' : 'comments'}
                    </button>
                )}

                {replies.length > 0 && showHideReply && replies.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} />
                ))}

                {replies.length === 0 && !loading && (
                    <div className="pc-no-comments">No comments yet</div>
                )}
            </div>

        </div>
    );
};

export default PostCardReply;
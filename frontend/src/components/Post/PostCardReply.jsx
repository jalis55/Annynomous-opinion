import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import useWebSocket from 'react-use-websocket';
import api from '../../api/axios';

const styles = `
  .pc-reply-root {
    font-family: 'Segoe UI', system-ui, sans-serif;
    padding: 8px 0;
  }

  /* ── Comment button ── */
  .pc-comment-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: #65676b;
    font-size: 13.5px;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .pc-comment-btn:hover {
    background: #f0f2f5;
    color: #1877f2;
  }
  .pc-comment-btn svg { flex-shrink: 0; }

  /* ── Input panel ── */
  .pc-input-panel {
    display: none;
    margin-top: 10px;
    animation: pcFadeSlide 0.18s ease;
  }
  .pc-input-panel.open { display: block; }

  @keyframes pcFadeSlide {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pc-input-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .pc-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .pc-textarea-wrap {
    flex: 1;
    background: #f0f2f5;
    border-radius: 20px;
    padding: 9px 14px;
    display: flex;
    align-items: flex-start;
    transition: background 0.15s, box-shadow 0.15s;
  }
  .pc-textarea-wrap:focus-within {
    background: #fff;
    box-shadow: 0 0 0 2px #1877f220, 0 1px 6px rgba(0,0,0,0.08);
  }

  .pc-textarea {
    flex: 1;
    border: none;
    background: transparent;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
    color: #1c1e21;
    outline: none;
    min-height: 22px;
    max-height: 120px;
    overflow-y: auto;
  }
  .pc-textarea::placeholder { color: #bcc0c4; }
  .pc-textarea:disabled { opacity: 0.5; cursor: not-allowed; }

  .pc-actions-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
    padding-left: 44px;
  }

  .pc-btn-cancel {
    background: none;
    border: none;
    color: #65676b;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.15s;
  }
  .pc-btn-cancel:hover:not(:disabled) { background: #f0f2f5; }
  .pc-btn-cancel:disabled { opacity: 0.45; cursor: not-allowed; }

  .pc-btn-post {
    background: #1877f2;
    border: none;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 18px;
    border-radius: 20px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s, transform 0.1s;
  }
  .pc-btn-post:hover:not(:disabled) { background: #166fe5; transform: translateY(-1px); }
  .pc-btn-post:disabled { background: #bcc0c4; cursor: not-allowed; transform: none; }

  .pc-spinner {
    width: 12px; height: 12px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: pcSpin 0.7s linear infinite;
    display: inline-block;
  }
  @keyframes pcSpin { to { transform: rotate(360deg); } }

  /* ── Replying-to badge ── */
  .pc-replying-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #e7f0fd;
    color: #1877f2;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px 3px 8px;
    border-radius: 20px;
    margin-bottom: 8px;
    margin-left: 44px;
  }

  /* ── Comments list ── */
  .pc-comments-section { margin-top: 10px; }

  .pc-view-btn {
    background: none;
    border: none;
    color: #65676b;
    font-size: 13px;
    font-weight: 600;
    padding: 4px 6px;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: background 0.15s, color 0.15s;
    margin-bottom: 6px;
  }
  .pc-view-btn:hover { background: #f0f2f5; color: #1877f2; }

  .pc-no-comments {
    font-size: 13px;
    color: #bcc0c4;
    padding: 4px 0;
  }

  /* ── Comment item ── */
  .pc-comment-item {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    animation: pcFadeSlide 0.2s ease;
  }

  .pc-comment-item.nested {
    margin-left: 42px;
    margin-top: 8px;
    margin-bottom: 6px;
  }

  .pc-comment-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .pc-comment-item.nested .pc-comment-avatar {
    width: 26px;
    height: 26px;
  }

  .pc-comment-body { flex: 1; }

  .pc-bubble {
    display: inline-block;
    background: #f0f2f5;
    border-radius: 16px;
    padding: 8px 13px;
    font-size: 13.5px;
    color: #1c1e21;
    line-height: 1.45;
    max-width: 100%;
    word-break: break-word;
  }
  .pc-comment-item.nested .pc-bubble {
    background: #e9ebee;
    font-size: 13px;
    border-radius: 12px;
    padding: 6px 11px;
  }

  .pc-comment-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 3px;
    padding-left: 4px;
  }

  .pc-reply-link {
    background: none;
    border: none;
    color: #65676b;
    font-size: 12px;
    font-weight: 700;
    padding: 0;
    cursor: pointer;
    transition: color 0.15s;
  }
  .pc-reply-link:hover { color: #1877f2; text-decoration: underline; }

  /* ── Thread line for nested ── */
  .pc-nested-replies {
    position: relative;
    margin-top: 4px;
    padding-left: 4px;
  }
  .pc-nested-replies::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 10px;
    width: 2px;
    background: #e4e6eb;
    border-radius: 2px;
  }

  /* ── Loading / Error ── */
  .pc-loading, .pc-error {
    font-size: 13px;
    padding: 10px 0;
    color: #65676b;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pc-error { color: #e53e3e; }
`;

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
        <>
            <style>{styles}</style>
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
        </>
    );
};

export default PostCardReply;
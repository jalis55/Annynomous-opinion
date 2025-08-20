import React, { useState, useEffect, useRef } from 'react';

import Sentiment from 'sentiment';

import CommentModal from '../Comment Modal/CommentModal';

import PostCard from './PostCard';

const Posts = ({ post }) => {
    const [sentiment, setSentiment] = useState(null);
    // const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        // Analyze sentiment using Sentiment.js
        const sentimentAnalyzer = new Sentiment();
        const result = sentimentAnalyzer.analyze(post.post_content);
        const sentimentScore = result.score;

        let sentimentType = 'Neutral';
        if (sentimentScore > 0) {
            sentimentType = 'Positive';
        } else if (sentimentScore < 0) {
            sentimentType = 'Negative';
        }
        setSentiment(sentimentType);
    }, [post.post_content]);

    // const handleShow = () => setShowModal(true);
    // const handleClose = () => setShowModal(false);

    return (
        <div className="container mt-5">
            <PostCard post={post} />
        </div>

    );
}

export default Posts;

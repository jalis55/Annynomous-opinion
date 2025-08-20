import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import PostCardReply from './PostCardReply';
import PostCardBody from './PostCardBody';
import anonym from '../../images/anonym.png';
import Swal from 'sweetalert2';

const PostCard = ({post}) => {
    return (
        <>
            <div className="comment-card">
                <PostCardBody img={anonym} post={post.post_content} created_at={post.created_at} />
                <PostCardReply img={anonym} id={post.id} />
            </div>
        </>
    )
}

export default PostCard;

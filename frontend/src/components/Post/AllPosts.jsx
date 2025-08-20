

import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import Posts from './Posts';
import './Post.css';

const WS_URL = 'ws://127.0.0.1:8000/ws/homepage/';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  // 1️⃣  REST fetch on first mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/')
      .then(res => res.json())
      .then(json => setPosts(json?.results || json))
      .catch(console.error);
  }, []);

  // 2️⃣  Live WebSocket feed
  const { lastMessage } = useWebSocket(WS_URL, { shouldReconnect: () => true });

  useEffect(() => {
    if (lastMessage !== null) {
      const newPost = JSON.parse(lastMessage.data);
      setPosts(prev => [newPost, ...prev]);
    }
  }, [lastMessage]);

  return (
    <div className="container">
      <h1>Public Wall</h1>
      <hr className="w-50 ml-0" />
      <div className="row">
        {posts.length ? (
          posts.map(p => <Posts key={p.id} post={p} />)
        ) : (
          <p className="well">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
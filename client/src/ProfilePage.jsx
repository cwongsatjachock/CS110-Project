// ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // Fetch user profile data
    axios.get('http://localhost:4000/user/profile', { withCredentials: true })
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile data:', error));
    
    // Fetch user posts data
    axios.get('http://localhost:4000/user/posts', { withCredentials: true })
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>{profile.username}'s Profile</h1>
      <p>Email: {profile.email}</p>
      
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilePage;

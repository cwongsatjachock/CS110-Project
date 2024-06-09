import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function UserProfile({ match }) {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (match && match.params && match.params.username) {
      const username = match.params.username;
      // Fetch user profile
      axios.get(`http://localhost:4000/user/${username}`)
        .then(response => setUserData(response.data))
        .catch(error => console.log(error));
      
      // Fetch user's posts
      axios.get(`http://localhost:4000/user/${username}/posts`)
        .then(response => setUserPosts(response.data))
        .catch(error => console.log(error));
    }
  }, [match]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      {/* Render user's posts */}
      <div>
        <h3>User's Posts:</h3>
        <ul>
          {userPosts.map(post => (
            <li key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  })
};

export default UserProfile;

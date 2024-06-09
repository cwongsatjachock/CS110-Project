import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post'; // Import the Post component
import { useParams } from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // State to store user's posts
  const { username } = useParams();

  useEffect(() => {
    axios.get('http://localhost:4000/profile/view/' + username, { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        // Fetch user's posts after user data is fetched
        fetchUserPosts(response.data.username);
      })
      .catch(error => console.log(error));
  }, [username]);

  // Function to fetch user's posts
  const fetchUserPosts = (username) => {
    axios.get(`http://localhost:4000/user/${username}/posts`, { withCredentials: true })
      .then(response => setUserPosts(response.data))
      .catch(error => console.log(error));
  };

  if (!userData) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-6 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>Email: {userData.email}</p>
        <p>Username: {userData.username}</p>
      </div>

      {/* Display user's posts */}
      <div className="bg-gray-800 p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {userPosts.map(post => (
          <Post key={post._id} {...post} open={true} isListing={true} />
        ))}
      </div>
    </div>
  );
}

export default UserProfile;

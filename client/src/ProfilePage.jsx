// ProfilePage.jsx
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import Post from './Post'; // Import the Post component

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [userPosts, setUserPosts] = useState([]); // State to store user's posts
  const user = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:4000/profile', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        // Fetch user's posts after user data is fetched
        fetchUserPosts(response.data.username);
      })
      .catch(error => console.log(error));
  }, []);

  // Function to fetch user's posts
  const fetchUserPosts = (username) => {
    axios.get(`http://localhost:4000/user/${username}/posts`, { withCredentials: true })
      .then(response => setUserPosts(response.data))
      .catch(error => console.log(error));
  };

  const handleEditUsername = () => {
    setEditingUsername(true);
    setNewUsername(userData.username);
  };

  const handleSaveUsername = () => {
    axios.put('http://localhost:4000/profile/username', { newUsername }, { withCredentials: true })
      .then(() => {
        setUserData({ ...userData, username: newUsername });
        setEditingUsername(false);
      })
      .catch(error => console.log(error));
  };

  const handleCancelEdit = () => {
    setEditingUsername(false);
  };

  if (!userData) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-6 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>Email: {userData.email}</p>
        {editingUsername ? (
          <div className="mt-4">
            <input
              className='bg-gray-100 text-black px-3 py-2 rounded-md mr-2'
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleSaveUsername}>Save</button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <div className="mt-4">
            <p>Username: {userData.username}</p>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleEditUsername}>Edit Username</button>
          </div>
        )}
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

export default ProfilePage;

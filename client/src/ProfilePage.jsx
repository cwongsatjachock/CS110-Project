import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const user = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:4000/profile', { withCredentials: true })
      .then(response => setUserData(response.data))
      .catch(error => console.log(error));
  }, []);

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
    </div>
  );
}

export default ProfilePage;

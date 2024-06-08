import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";

function PostsListing() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/comments', { withCredentials: true })
      .then(response => {
        setComments(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-reddit_dark">
      {comments.map(comment => (
        <Post key={comment._id} {...comment} isListing={true} open={false} rootId="" />
      ))}
    </div>
  );
}

export default PostsListing;

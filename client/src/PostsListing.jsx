import Post from "./Post";
import {useState, useEffect} from "react";
import axios from "axios";

function PostsListing() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/comments', {withCredentials: true})
      .then(response => setComments(response.data));
  }, []);

  return (
    <div className="bg-reddit_dark">
      {comments.map(comment => (
        <Post key={comment._id} {...comment} isListing={true} />
      ))}
    </div>
  );
}

export default PostsListing;

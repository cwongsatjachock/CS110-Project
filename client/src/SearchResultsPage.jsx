import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { useParams } from "react-router-dom";

function SearchResultsPage() {
  const { text } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/comments?search=' + text, { withCredentials: true })
      .then(response => setComments(response.data));
  }, [text]);

  return (
    <div className="bg-reddit_dark">
      {comments.map(comment => (
        <Post key={comment._id} {...comment} isListing={true} />
      ))}
    </div>
  );
}

export default SearchResultsPage;

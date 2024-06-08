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
        <Post 
          key={comment._id} 
          open={false} 
          isListing={true} 
          _id={comment._id}
          author={comment.author}
          postedAt={comment.postedAt}
          title={comment.title}
          body={comment.body}
        />
      ))}
    </div>
  );
}

export default SearchResultsPage;

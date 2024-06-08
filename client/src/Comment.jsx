import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"; // Import remark-gfm plugin
import Post from "./Post";
import CommentForm from "./CommentForm";
import RootCommentContext from "./RootCommentContext";
import Comments from "./Comments";

function Comment(props) {
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsTotals, setCommentsTotals] = useState(null);
  const [userVotes, setUserVotes] = useState(null);

  function refreshComments() {
    axios.get('http://localhost:4000/comments/root/' + props.id)
      .then(response => {
        setComments(response.data);
      });
  }

  function refreshVotes() {
    const commentsIds = [comment._id, ...comments.map(c => c._id)];
    axios.post('http://localhost:4000/votes', { commentsIds }, { withCredentials: true })
      .then(response => {
        setCommentsTotals(response.data.commentsTotals);
        setUserVotes(response.data.userVotes);
      });
  }

  useEffect(() => {
    if (props.comment) {
      setComment(props.comment);
    } else {
      axios.get('http://localhost:4000/comments/' + props.id)
        .then(response => {
          setComment(response.data);
        });
    }
    refreshComments();
  }, [props.id, props.comment]);

  useEffect(() => {
    refreshVotes();
  }, [comments.length]);

  return (
    <>
      {comment && (
        <Post {...comment} open={true} />
      )}
      {!!comment && !!comment._id && (
        <>
          <hr className="border-reddit_border my-4" />
          <CommentForm onSubmit={() => refreshComments()}
            rootId={comment._id} parentId={comment._id} showAuthor={true} />
          <hr className="border-reddit_border my-4" />
          <RootCommentContext.Provider value={{ refreshComments, refreshVotes, commentsTotals, userVotes }}>
            <Comments
              parentId={comment._id}
              rootId={comment._id}
              comments={comments} />
          </RootCommentContext.Provider>
          <hr className="border-reddit_border my-4" />
          <div>
            <ReactMarkdown remarkPlugins={[gfm]}>{comment.body}</ReactMarkdown>
          </div>
        </>
      )}
    </>
  );
}

// Add PropTypes validation
Comment.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.object, // or any other appropriate type
};

export default Comment;

import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Board from "./Board";
import CommentPage from "./CommentPage";
import CommentModal from "./CommentModal";
import SearchResultsPage from "./SearchResultsPage";
import ProfilePage from './ProfilePage';
import UserProfile from './UserProfile'; // Import the UserProfile component

function RoutingSwitch(props) { // Ensure props are passed to RoutingSwitch
  const [postOpen, setPostOpen] = useState(false);
  let location = useLocation();
  let commentId = null;

  if (location.state && location.state.commentId) {
    location.pathname = '/';
    if (postOpen) {
      commentId = location.state.commentId;
    } else {
      location.state.commentId = null;
    }
  }

  useEffect(() => {
    setPostOpen(true);
  }, [commentId]);

  useEffect(() => {
    commentId = null;
  }, [postOpen]);

  return (
    <div>
      {commentId && (
        <div>
          <CommentModal
            id={commentId}
            open={postOpen}
            onClickOut={() => setPostOpen(false)} />
        </div>
      )}
      <Routes location={location}>
        <Route path="/" element={<Board />} />
        <Route path="/comments/:id" element={<CommentPage />} />
        <Route path="/search/:text" element={<SearchResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:username" element={<UserProfile {...props} />} /> 
      </Routes>
    </div>
  );
}

export default RoutingSwitch;

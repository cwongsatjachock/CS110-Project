import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Board from "./Board";
import CommentPage from "./CommentPage";
import CommentModal from "./CommentModal";
import SearchResultsPage from "./SearchResultsPage";
import ProfilePage from './ProfilePage';
import UserProfile from './UserProfile';

function RoutingSwitch() {
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
        <Route path="/profile/view/:username" element={<UserProfile />} /> 
      </Routes>
    </div>
  );
}

export default RoutingSwitch;

import PropTypes from 'prop-types'; // Import PropTypes

import { Link } from "react-router-dom";
import PostContent from "./PostContent";

function Post(props) {
  let postClasses = "block border rounded-md " + (props.open ? "" : "hover:border-reddit_text cursor-pointer");
  if (props.isListing) {
    postClasses += " bg-reddit_dark-brighter p-3 mx-6 border-2 border-reddit_border";
  } else {
    postClasses += " border-none";
  }

  return (
    <div className="text-reddit_text pb-4">
      {props.open && (
        <div className={postClasses}>
          <PostContent {...props} />
        </div>
      )}
      {!props.open && (
        <Link to={{ pathname: '/comments/' + (props.rootId || props._id), state: { commentId: (props.rootId || props._id) } }} className={postClasses}>
          <PostContent {...props} />
        </Link>
      )}
    </div>
  );
}

Post.propTypes = {
  open: PropTypes.bool.isRequired,
  isListing: PropTypes.bool.isRequired, 
  rootId: PropTypes.bool.isRequired, 
  _id: PropTypes.bool.isRequired
};

export default Post;

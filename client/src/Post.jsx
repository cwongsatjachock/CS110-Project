import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import PostContent from "./PostContent";

function Post(props) {
  const { open, isListing, rootId, _id, author, postedAt, title, body } = props;

  let postClasses = "block border rounded-md " + (open ? "" : "hover:border-reddit_text cursor-pointer");
  if (isListing) {
    postClasses += " bg-reddit_dark-brighter p-3 mx-6 border-2 border-reddit_border";
  } else {
    postClasses += " border-none";
  }

  return (
    <div className="text-reddit_text pb-4">
      {open ? (
        <div className={postClasses}>
          <PostContent author={author} postedAt={postedAt} title={title} body={body} />
        </div>
      ) : (
        <Link to={{ pathname: '/comments/' + (rootId || _id), state: { commentId: (rootId || _id) } }} className={postClasses}>
          <PostContent author={author} postedAt={postedAt} title={title} body={body} />
        </Link>
      )}
    </div>
  );
}

Post.propTypes = {
  open: PropTypes.bool.isRequired,
  isListing: PropTypes.bool.isRequired, 
  rootId: PropTypes.string,
  _id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default Post;

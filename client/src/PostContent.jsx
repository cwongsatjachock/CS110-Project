// PostContent.jsx
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Link } from 'react-router-dom';
import RedirectContext from "./RedirectContext";
import {  useContext } from 'react';

function PostContent({ author, postedAt, title = "Untitled", body }) {

  const { setRedirect } = useContext(RedirectContext);
  function doClickProfile(ev) {
    ev.preventDefault();
    setRedirect('/profile/view/' + encodeURIComponent(author));
  }
  return (
    <div>
      <h5 className="text-reddit_text-darker text-sm mb-1">
        Posted by <Link onClick={doClickProfile} className="text-blue-500 hover:underline">u/{author}</Link> <TimeAgo datetime={postedAt} />
      </h5>
      <h2 className="text-xl mb-3">{title}</h2>
      <div className="text-sm leading-6">
        <ReactMarkdown remarkPlugins={[gfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

PostContent.propTypes = {
  author: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
};

export default PostContent;
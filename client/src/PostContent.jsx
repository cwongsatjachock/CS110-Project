import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function PostContent({ author, postedAt, title = "Untitled", body }) {
  return (
    <div>
      <h5 className="text-reddit_text-darker text-sm mb-1"> Posted by u/{author} <TimeAgo datetime={postedAt} /></h5>
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

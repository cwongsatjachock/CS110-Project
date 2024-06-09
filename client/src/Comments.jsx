import PropTypes from 'prop-types'; // Import PropTypes
import TimeAgo from 'timeago-react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useState, useContext } from 'react';
import RootCommentContext from "./RootCommentContext";
import Voting from "./Voting";
import Button from "./Button";
import CommentForm from "./CommentForm";

function Comments(props) {
  const [showForm, setShowForm] = useState(false);
  const comments = props.comments.filter(comment => props.parentId === comment.parentId);
  const rootCommentInfo = useContext(RootCommentContext);

  return (
    <div className={'my-2 text-reddit_text'}>
      {comments.map(comment => {
        const replies = props.comments.filter(c => c.parentId === comment._id);
        return (
          <div key={comment._id} className={'mb-2'}>
            <div className="flex mb-2">
              <div className="bg-reddit_text w-10 h-10 rounded-full mr-2"/>
              <div className="leading-10 pr-2 text-lg font-sans">{comment.author}</div>
              <TimeAgo className="leading-10 text-md font-sans" datetime={comment.postedAt}/>
            </div>
            <div className="border-l-2 border-reddit_text-darker p-3 pb-0" style={{marginLeft:'18px'}}>
              <div className="pl-4 -mt-4">
                <div>
                  {/* Render the ReactMarkdown component directly */}
                  <ReactMarkdown remarkPlugins={[gfm]}>
                    {comment.body}
                  </ReactMarkdown>
                </div>
                <Voting commentId={comment._id}>
                  {/* Nest Voting component children here */}
                </Voting>
                <Button type={'button'} onClick={() => setShowForm(comment._id)}
                        className="bg-reddit_dark-brighter text-reddit_text-darker border-none py-2 pl-0 pr-0">
                  Reply
                </Button>
                {comment._id === showForm && (
                  <div>
                    <CommentForm
                      parentId={comment._id}
                      rootId={props.rootId}
                      onSubmit={() => {
                        setShowForm(false);
                        rootCommentInfo.refreshComments();
                      }}
                      showAuthor={false}
                      onCancel={() => setShowForm(false)} 
                    />
                  </div>
                )}
                {replies.length > 0 && (
                  <div>
                    <Comments comments={props.comments} parentId={comment._id} rootId={props.rootId} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  parentId: PropTypes.string.isRequired,
  rootId: PropTypes.string,
};

export default Comments;


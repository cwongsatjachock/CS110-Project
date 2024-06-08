import { useParams } from 'react-router-dom'; 
import Comment from './Comment';

function CommentPage() {
  const { id } = useParams(); 

  return (
    <div className="py-4 px-6 bg-reddit_dark">
      <div className="bg-reddit_dark-brighter p-3 rounded-md">
        <Comment id={id} />
      </div>
    </div>
  );
}

export default CommentPage;

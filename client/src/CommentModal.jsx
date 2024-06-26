import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types"; 
import axios from "axios";
import Comment from "./Comment";

function CommentModal(props) {
  const [comment, setComment] = useState({});

  const visibleClass = props.open ? 'block' : 'hidden';

  useEffect(() => {
    axios.get('http://localhost:4000/comments/' + props.id)
      .then(response => {
        setComment(response.data);
      });
  }, [props.id]);

  function close() {
    setComment({});
    props.onClickOut();
  }

  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.8)' }}>
      <div className="block overflow-scroll">
        <div ref={modalRef} className="border my-4 border-reddit_dark-brightest w-3/4 lg:w-1/2 bg-reddit_dark-brighter text-reddit_text self-center p-4 mx-auto rounded-md">
          <div className="">
            <Comment comment={comment} id={props.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

CommentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onClickOut: PropTypes.func.isRequired
};

export default CommentModal;

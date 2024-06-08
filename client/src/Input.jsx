import PropTypes from 'prop-types'; 

function Input(props) {
  return (
    <input {...props} className={"bg-reddit_dark-brighter text-reddit_text p-2 border border-reddit_dark-brightest rounded-md block " + props.className} />
  );
}


Input.propTypes = {
  className: PropTypes.string, 
};

export default Input;

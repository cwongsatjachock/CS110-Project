function Button({ outline, className, ...rest }) {
  let classNames = "border rounded-full px-3 text-sm font-bold ";
  if (outline) {
    classNames += "border-gray-300 text-gray-300 ";
  } else {
    classNames += "bg-gray-300 text-reddit_dark ";
  }
  return <button className={classNames + className} {...rest} />;
}

export default Button;

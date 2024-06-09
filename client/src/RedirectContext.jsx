// RedirectContext.jsx
import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const RedirectContext = createContext();

export const RedirectProvider = ({ children }) => {
  const [redirect, setRedirect] = useState(null);

  return (
    <RedirectContext.Provider value={{ redirect, setRedirect }}>
      {children}
    </RedirectContext.Provider>
  );
};

RedirectProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export default RedirectContext;

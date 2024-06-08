import Header from "./Header";
import {BrowserRouter as Router, useNavigate} from "react-router-dom";
import RoutingSwitch from "./RoutingSwitch";
import PostFormModal from "./PostFormModal";
import AuthModal from "./AuthModal";
import {useContext, useEffect} from "react";
import RedirectContext from "./RedirectContext";

function Routing() {
  return (
    <Router>
      <RoutingContent />
    </Router>
  );
}

function RoutingContent() {
  const {redirect, setRedirect} = useContext(RedirectContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      setRedirect(false);
    }
  }, [redirect, navigate, setRedirect]);

  return (
    <>
      <Header />
      <RoutingSwitch />
      <PostFormModal />
      <AuthModal />
    </>
  );
}

export default Routing;
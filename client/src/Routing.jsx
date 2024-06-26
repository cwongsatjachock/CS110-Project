import { useContext, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Header from "./Header";
import RoutingSwitch from "./RoutingSwitch";
import PostFormModal from "./PostFormModal";
import AuthModal from "./AuthModal";
import RedirectContext from "./RedirectContext";
import Footer from "./Footer";

function Routing() {
  return (
    <Router>
      <RoutingContent />
    </Router>
  );
}

function RoutingContent() {
  const { redirect, setRedirect } = useContext(RedirectContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      setRedirect(null);
    }
  }, [redirect, navigate, setRedirect]);

  return (
    <div className="min-h-screen flex flex-col bg-reddit_dark">
      <Header />
      <main className="flex-grow">
        <RoutingSwitch />
      </main>
      <Footer />
      <PostFormModal />
      <AuthModal />
    </div>
  );
}

export default Routing;

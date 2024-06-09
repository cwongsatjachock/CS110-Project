import Logo from "./logo.png";

function Footer() {
  return (
    <footer className="w-full bg-reddit_dark p-4 mt-4">
      <div className="mx-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-8 h-8 mr-4" />
          <span className="text-gray-400 text-sm">© 2024 FakeReddit.</span>
        </div>
        <div className="text-gray-400 text-sm">
          <span>Privacy Policy</span> | <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

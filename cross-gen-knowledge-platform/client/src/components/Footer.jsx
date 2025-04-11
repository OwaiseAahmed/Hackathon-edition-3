import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-10 mt-20 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        {}
        <div className="flex flex-wrap gap-6 justify-center text-lg font-semibold">
         
        </div>

        {}
        <div className="flex flex-wrap gap-6 justify-center text-md font-medium mt-4 md:mt-0">
          <Link to="/about" className="text-white hover:underline">About Us          </Link>
          <Link to="/contact" className="text-white hover:underline">Contact         </Link>
          <Link to="/terms" className="text-white hover:underline">Terms of Service  </Link>
          <Link to="/privacy" className="text-white hover:underline">Privacy Policy  </Link>
        </div>
      </div>

      <p className="text-center mt-10 text-gray-300">&copy; 2025 Cross-Gen Knowledge Platform. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

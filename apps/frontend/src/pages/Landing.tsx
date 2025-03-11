import { motion } from 'framer-motion';
import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Swash Flag</Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-400">
            Features
          </a>
          <a href="#" className="hover:text-gray-400">
            Pricing
          </a>
          <a href="#" className="hover:text-gray-400">
            Docs
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.main
        className="flex flex-col items-center justify-center flex-grow text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Control Your Features <br />
          with <span className="text-blue-400">Swash Flag</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl">
          Deploy, test, and manage feature flags effortlessly. Power up your
          development workflow with ease.
        </p>
        <div className="mt-6 flex space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white text-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-800 transition text-white text-lg"
          >
            Sign Up
          </Link>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-4 text-center text-gray-500">
        © {new Date().getFullYear()} Swash Flag. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

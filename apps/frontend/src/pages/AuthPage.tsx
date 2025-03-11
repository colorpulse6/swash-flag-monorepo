import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';

const AuthPage = ({ startLogin = true }: { startLogin?: boolean }) => {
  const [isLogin, setIsLogin] = useState(startLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useContext(AuthContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center">
      <div className="absolute top-6 left-6 text-2xl font-bold">
        {' '}
        <Link to="/">Swash Flag</Link>
      </div>

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold">
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-400 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full p-3 bg-green-500 hover:bg-green-600 rounded text-white font-bold">
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-400 hover:underline"
              >
                Login
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;

import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { FiFlag, FiKey, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const location = useLocation();
  const { logout } = useContext(AuthContext)!;

  return (
    <motion.div
      initial={{ width: isOpen ? 256 : 80 }}
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full bg-gray-900 text-white shadow-lg p-4 flex flex-col z-50"
    >
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="text-white mb-6 p-2 hover:bg-gray-700 rounded-md flex items-center"
      >
        <FiChevronRight
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
        {isOpen && <span className="ml-2 text-lg font-bold">Swash Flag</span>}
      </button>

      {/* Navigation */}
      <nav className="flex-grow space-y-3">
        <Link
          to="/dashboard"
          className={`flex items-center p-3 rounded-lg transition ${
            location.pathname === '/dashboard'
              ? 'bg-blue-500'
              : 'hover:bg-gray-700'
          }`}
        >
          <FiFlag className="text-xl" />
          {isOpen && <span className="ml-2">Feature Flags</span>}
        </Link>

        <Link
          to="/api-tokens"
          className={`flex items-center p-3 rounded-lg transition ${
            location.pathname === '/api-tokens'
              ? 'bg-blue-500'
              : 'hover:bg-gray-700'
          }`}
        >
          <FiKey className="text-xl" />
          {isOpen && <span className="ml-2">API Tokens</span>}
        </Link>
      </nav>

      {/* Logout */}
      <button
        className="flex items-center p-3 rounded-lg transition hover:bg-red-600"
        onClick={logout}
      >
        <FiLogOut className="text-xl" />
        {isOpen && <span className="ml-2">Logout</span>}
      </button>
    </motion.div>
  );
}

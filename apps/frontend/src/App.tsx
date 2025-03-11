import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/Landing.tsx';
import AuthPage from './pages/AuthPage.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import Layout from './components/Layout.tsx';
import FlagsPage from './pages/FlagsPage/FlagsPage.tsx';
import ApiTokensPage from './pages/APITokensPage/APITokensPage.tsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage startLogin />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<FlagsPage />} />
            <Route path="/api-tokens" element={<ApiTokensPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

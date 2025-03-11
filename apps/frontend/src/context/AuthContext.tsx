import { createContext, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../api/AuthService';
import { useNavigate } from 'react-router';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      AuthService.login(data.email, data.password),
    onSuccess: (data) => {
      setToken(data.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      AuthService.signup(data.email, data.password),
    onSuccess: () => {
      alert('Signup successful! Please login.');
      navigate('/login');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password }); // ✅ Wrap inside a function
  };

  const signup = (email: string, password: string) => {
    signupMutation.mutate({ email, password }); // ✅ Wrap inside a function
  };

  const logout = () => {
    AuthService.logout();
    setToken(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { GenerateApiTokenResponse } from './types.ts';
import apiConfig from '../utils/api-config';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

class AuthApi {
  private API_URL = `${apiConfig.apiUrl}/api/auth`;

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error('No token received from server');
    }

    localStorage.setItem('token', data.token); // ✅ Store token after login
    return data;
  }

  async signup(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Signup failed');
    }

    return response.json();
  }

  fetchApiTokens = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${this.API_URL}/api-tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch API tokens');
    }

    return response.json(); // Returns an array of tokens
  };

  generateApiToken = async (): Promise<GenerateApiTokenResponse> => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${this.API_URL}/generate-api-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to generate API token');
    }

    return response.json();
  };

  logout() {
    localStorage.removeItem('token');
  }
}

export const AuthService = new AuthApi();

import { Request, Response } from 'express';
import AuthService from "../services/AuthService";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.register(email, password);
      res.status(201).json({ message: 'User registered', user });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      res.json({ token, user });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getApiToken(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const apiToken = await AuthService.getApiToken(userId);
      res.json({ apiToken });
    } catch (error) {
      console.error('🚨 Error fetching API token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async generateApiToken(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const newApiToken = await AuthService.generateApiToken(userId);
      res.json({ newApiToken });
    } catch (error) {
      console.error('🚨 Error generating API token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AuthController();

import { Response } from 'express';
import {AuthenticatedRequest} from "../types";
import FeatureFlagService from "../services/FeatureFlagService";
import {featureFlagSchema} from "../validators/featureFlagValidator";

class FeatureFlagController {
  async getFlags(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const flags = await FeatureFlagService.getAllFlags(userId);
      res.json(flags);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch flags' });
    }
  }

  async getFlagById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const flag = await FeatureFlagService.getFlagById(userId, req.params.id);
      if (!flag) {
        res.status(404).json({ error: 'Feature flag not found' });
        return;
      }

      res.json(flag);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch feature flag' });
    }
  }

  async createFlag(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const validatedData = featureFlagSchema.parse(req.body);
      const flag = await FeatureFlagService.createFlag(userId, validatedData);

      res.status(201).json(flag);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Invalid data',
      });
    }
  }

  async updateFlag(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      if (!userId) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const updates = req.body;

      console.log('🔹 Update Request:', { id, userId, updates });

      const flag = await FeatureFlagService.getFlagById(userId, id);

      if (!flag) {
        res.status(404).json({ error: 'Flag not found' });
        return;
      }

      if (flag.userId !== userId) {
        res.status(403).json({ error: 'Unauthorized to update this flag' });
        return;
      }

      const updatedFlag = await FeatureFlagService.updateFlag(
        id,
        userId,
        updates,
      );

      if (!updatedFlag) {
        res.status(400).json({ error: 'Update failed' });
        return;
      }

      res.json(updatedFlag);
    } catch (error) {
      console.error('🚨 Update Flag Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteFlag(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      if (!userId) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      console.log('🔹 Delete Request:', { id, userId });

      const flag = await FeatureFlagService.getFlagById(userId, id);

      if (!flag) {
        res.status(404).json({ error: 'Flag not found' });
        return;
      }

      if (flag.userId !== userId) {
        res.status(403).json({ error: 'Unauthorized to delete this flag' });
        return;
      }

      const deleteResult = await FeatureFlagService.deleteFlag(id, userId);

      if (!deleteResult) {
        res.status(400).json({ error: 'Delete failed' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('🚨 Delete Flag Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async evaluateFlag(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      if (!userId) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const isEnabled = await FeatureFlagService.evaluateFlag(
        userId,
        id,
        req.body.user,
      );
      res.json({ enabled: isEnabled });
    } catch (error) {
      res.status(500).json({ error: 'Evaluation failed' });
    }
  }
}

export default new FeatureFlagController();

import express from 'express';
import {authenticateJWT} from "../middleware/authenticateJWT";
import FeatureFlagController from "../controllers/FeatureFlagController";


const router = express.Router();

// 🔒 Protect these routes with `authenticateJWT`
router.get('/flags', authenticateJWT, FeatureFlagController.getFlags);
router.get('/flags/:id', authenticateJWT, FeatureFlagController.getFlagById);
router.post('/flags', authenticateJWT, FeatureFlagController.createFlag);
router.put('/flags/:id', authenticateJWT, FeatureFlagController.updateFlag);
router.delete('/flags/:id', authenticateJWT, FeatureFlagController.deleteFlag);
router.post(
  '/flags/:id/evaluate',
  authenticateJWT,
  FeatureFlagController.evaluateFlag,
);

export default router;

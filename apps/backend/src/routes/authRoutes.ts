import express from 'express';
import AuthController from "../controllers/AuthController";
import {authenticateJWT} from "../middleware/authenticateJWT";


const router = express.Router();

router.post('/signup', AuthController.register);
router.post('/login', AuthController.login);

router.get('/api-tokens', authenticateJWT, AuthController.getApiToken);
router.post(
  '/generate-api-token',
  authenticateJWT,
  AuthController.generateApiToken,
);

export default router;

import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// OTP endpoints
router.post('/otp/request', (req, res) => authController.requestOtp(req, res));
router.post('/otp/verify', (req, res) => authController.verifyOtp(req, res));

// Magic link endpoints
router.post('/magic/request', (req, res) => authController.requestMagicLink(req, res));
router.get('/magic/verify', (req, res) => authController.verifyMagicLink(req, res));

// OAuth endpoints
router.post('/oauth/callback', (req, res) => authController.oauthCallback(req, res));

// Token management
router.post('/refresh', (req, res) => authController.refreshToken(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

// Protected endpoints
router.get('/me', authenticateToken, (req, res) => authController.getCurrentUser(req, res));

export default router;

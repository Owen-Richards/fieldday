import { Router } from 'express';
import authRoutes from './auth';
// Old controllers commented out - using new auth system
// import * as userController from '../controllers/userController';
// import * as activityController from '../controllers/activityController';

const router = Router();

// Auth routes (passwordless)
router.use('/auth', authRoutes);

// Old routes commented out - replace with new auth system
// // User routes
// router.post('/users/register', userController.registerUser);
// router.post('/users/login', userController.authenticateUser);
// router.get('/users/:id', userController.getUserProfile);

// // Activity routes
// router.post('/activities', activityController.createActivity);
// router.get('/activities', activityController.getActivities);
// router.get('/activities/:id', activityController.getActivity);

export default router;

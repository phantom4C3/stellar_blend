import express from 'express';
import { getNotifications, addNotification, clearNotification, clearAllNotifications } from '../controllers/notification.controller.js';
import  authMiddleware  from '../middlewares/auth.middlewares.js';

const notificationRouter = express.Router();

notificationRouter.get('/', authMiddleware, getNotifications);
notificationRouter.post('/', authMiddleware, addNotification);
notificationRouter.delete('/:id', authMiddleware, clearNotification);
notificationRouter.delete('/', authMiddleware, clearAllNotifications);

export default notificationRouter;
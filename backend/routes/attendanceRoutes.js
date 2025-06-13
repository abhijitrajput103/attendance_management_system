import express from 'express';
import { markAttendance, getAttendanceReport } from '../controllers/attendanceController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/mark', protect(), markAttendance);
router.get('/report', protect(), getAttendanceReport);

export default router;

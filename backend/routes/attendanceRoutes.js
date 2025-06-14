import express from 'express';
import { markAttendance, getAttendanceReport, getAttendanceSummary } from '../controllers/attendanceController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/mark', protect(), markAttendance);
router.get('/report', protect(), getAttendanceReport);
router.get('/summary', protect(), getAttendanceSummary);

export default router;

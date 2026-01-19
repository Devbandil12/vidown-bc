import { Router } from 'express';
import { downloadVideo } from '../controller/videoDownloader.js';
const router = Router();
// Route: GET /api/download?url=...
router.get('/asd', downloadVideo);
export default router;

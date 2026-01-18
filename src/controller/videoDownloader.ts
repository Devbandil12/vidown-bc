import { Request, Response } from 'express';
import { getVideoStream } from '../service/videoDownloadService';
import { isValidVideoUrl } from '../utils/urlValidator';

export const downloadVideo = async (req: Request, res: Response) => {
    try {
        const videoUrl = req.query.url as string;
      if (!videoUrl || !isValidVideoUrl(videoUrl)) {
            return res.status(400).json({ 
                error: "Invalid URL", 
                message: "Please provide a valid public video URL (http/https)." 
            });
        }

        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
        res.setHeader('Content-Type', 'video/mp4');

        const stream = getVideoStream(videoUrl);
        if(!stream) {
            return res.status(500).send("Could not get video stream");
        }
        // This will now work without TypeScript errors!
        stream.pipe(res);
  res.on('close', () => {
    stream.destroy(); // Stop the stream and process when user leaves
});
        stream.on('error', (err) => {
            console.error("Stream Error:", err);
            if (!res.headersSent) res.status(500).send("Streaming failed");
        });


      
    } catch (error) {
        res.status(500).send("Server Error");
    }
};
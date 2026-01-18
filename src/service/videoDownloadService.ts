import { YtDlp } from 'ytdlp-nodejs';
import { PassThrough } from 'stream';

const ytdlp = new YtDlp();
export const getVideoStream = (url: string) => {
   const passThrough = new PassThrough();
    
    try {const stream = ytdlp.stream(url, {
        // 'b' stands for 'best' - it picks the best single file with both video and audio
        format: 'b[ext=mp4]', 
    });

    stream.pipe(passThrough);

   
    return passThrough;
        
    } catch (error) {
        passThrough.destroy()
    }
};
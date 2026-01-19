import { YtDlp } from 'ytdlp-nodejs';
const ytdlp = new YtDlp();
export const isValidVideoUrl = (url) => {
    try {
        // 1. Basic URL structure check
        const parsedUrl = new URL(url);
        // 2. Protocol check (only allow http/https)
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            return false;
        }
        // 3. Block localhost/internal IPs to prevent SSRF attacks
        const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0'];
        if (blockedHosts.includes(parsedUrl.hostname)) {
            return false;
        }
        return true;
    }
    catch (err) {
        return false;
    }
};

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import downloadRoutes from './route/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors({
    // Replace '*' with your actual Vercel URL in production for better security
    origin: process.env.FRONTEND_URL , 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies/auth headers if needed
}));
// 2. Health Check (Useful for Render to see if your app is alive)
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

// 3. Routes
app.use('/dsa', downloadRoutes);

// 4. Start Server
const server=app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 Ready to stream videos`);
});


server.timeout = 600000; 
server.keepAliveTimeout = 610000;
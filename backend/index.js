const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('./src/infrastructure/db');
const globalErrorHandlingMiddleware = require('./src/api/middleware/global-error-handling-middleware');
const { clerkMiddleware } = require('@clerk/express');

// Connect to database
connectDB();

const app = express();

// Dynamic CORS configuration - allows same domain
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:8000',
        
        
    ].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (same domain, mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());

// Routes
const hotelRoute = require('./src/api/hotel');
const reviewRoute = require('./src/api/review');
const locationRoute = require('./src/api/location');

app.use('/api/hotels', hotelRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/locations', locationRoute);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Global error handler
app.use(globalErrorHandlingMiddleware);

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
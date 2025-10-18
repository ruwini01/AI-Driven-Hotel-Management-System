const express = require('express');
const connectDB = require('./src/infrastructure/db');
const cors = require('cors');
const globalErrorHandlingMiddleware = require('./src/api/middleware/global-error-handling-middleware');

const { clerkMiddleware } = require('@clerk/express');

//Connect to database
connectDB();

const app = express();
const PORT =  8000;

//Convert http payloads to json objects
app.use(express.json());

//Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173' 
}
));

app.use(clerkMiddleware());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


const hotelRoute = require('./src/api/hotel');
const reviewRoute = require("./src/api/review");
const locationRoute = require("./src/api/location");

app.use('/api/hotels', hotelRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/locations", locationRoute);


app.use(globalErrorHandlingMiddleware)
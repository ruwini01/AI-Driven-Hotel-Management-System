const express = require('express');
const connectDB = require('./src/infrastructure/db');

//Connect to database
connectDB();

const app = express();
const PORT =  8000;

//Convert http payloads to json objects
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


const hotelRoute = require('./src/api/hotel');

app.use('/api/hotels', hotelRoute);
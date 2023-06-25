const express = require('express');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;



dotenv.config({ path: './config/config.env' });

const app = express();
// using middleware for bootcap router

app.use('/api/v1/bootcamps', require('./routs/bootcamps'))

// making express methods
// fech all bootcamps
// making a good api for mantainess

app.listen(port, () => {
    console.log(`the application is listening on http://localhost:${port}`);
});

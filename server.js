const colors = require('colors')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectToDb = require('./config/db');
const errorhandle = require('./middleware/error');
const port = process.env.PORT || 5000;
// initializing middleware for log on information of our methods
dotenv.config({ path: './config/config.env' });

// connecting to database
connectToDb()

// initializing the app 
const app = express();
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// using middleware for bootcap router

app.use('/api/v1/bootcamps', require('./routs/bootcamps'))
app.use(errorhandle)
app.get('/', (req, res) => {
    res.json({ success: true, msg: 'this is main page' })
})

// creating server
const server = app.listen(port, () => {
    console.log(`the application is listening on http://localhost:${port}`.yellow.bold);
});
// handling error and closing server and showing in console  on any error 
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`.red.bold.underline);
    server.close(() => {
        process.exit(1)
    })
})


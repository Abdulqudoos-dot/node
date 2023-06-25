const express = require('express');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
// initializing middleware for log on information of our methods

const logger = (req, res, next) => {
    // console.log(req)
    const { method, hostname, path, port } = req
    console.log(`${method} ${hostname}${path} ${port}`)
    next()
}
dotenv.config({ path: './config/config.env' });

const app = express();
app.use(logger)
// using middleware for bootcap router

app.use('/api/v1/bootcamps', require('./routs/bootcamps'))
app.get('/', (req, res) => {
    res.json({ success: true, msg: 'this is main page' })
})
// making express methods
// fech all bootcamps
// making a good api for mantainess

app.listen(port, () => {
    console.log(`the application is listening on http://localhost:${port}`);
});

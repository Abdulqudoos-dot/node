const express = require('express');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
dotenv.config({ path: './config/config.env' });

const app = express();
// making express methods
// fech all bootcamps
// making a good api for mantainess
app.get('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({ success: true, msg: 'show all bootcams' });
});
// fech one bootcamp
app.get('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `showing the bootcamp of ${req.params.id} no id` });
});
// post bootcamp
app.post('/api/v1/bootcamps', (req, res) => {
    res.status(201).json({ success: true, msg: 'creating  the bootcamp' });
});

// update bootcamp

app.put('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `updating the bootcamp of ${req.params.id} no id` });
});

// delete bootcamp

app.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `deleting the bootcamp of ${req.params.id} no id` });
});
app.listen(port, () => {
    console.log(`the application is listening on http://localhost:${port}`);
});

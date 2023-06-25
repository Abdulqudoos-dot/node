const express = require('express')
const router = express.Router()





router.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'show all bootcams' });
});
// fech one bootcamp
router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `showing the bootcamp of ${req.params.id} no id` });
});
// post bootcamp
router.post('', (req, res) => {
    res.status(201).json({ success: true, msg: 'creating  the bootcamp' });
});

// update bootcamp

router.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `updating the bootcamp of ${req.params.id} no id` });
});

// delete bootcamp

router.delete('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `deleting the bootcamp of ${req.params.id} no id` });
});

module.exports = router
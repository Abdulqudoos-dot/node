const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter description']
    },
    weeks: {
        type: String,
        required: [true, 'Please enter no of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please enter the cost of tuition']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please enter minimum skill'],
        enum: ['bigenner', '[intermediate', 'advance']
    },
    scholarshipAvalable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }
})

module.exports = mongoose.model('course', courseSchema)
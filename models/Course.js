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
        ref: 'bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    }
})


courseSchema.statics.getAverageCost = async function (bootcampId) {
    console.log('Calculating average cost....'.blue)
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: "$bootcamp",
                averageCost: { $avg: '$tuition' }
            }
        }
    ])
    try {
        await this.model('bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10
        })
    } catch (err) {
        console.log(err)
    }
}
courseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp)
})
courseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.bootcamp)
})


module.exports = mongoose.model('course', courseSchema)
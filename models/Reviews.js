const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add title'],
        maxlength: 100
    },
    text: {
        type: String,

        required: [true, 'Please add text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add rating']
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
reviewSchema.statics.getAverageRating = async function (bootcampId) {
    console.log('Calculating average rating....'.blue)
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: "$bootcamp",
                averageRating: { $avg: '$rating' }
            }
        }
    ])
    try {
        await this.model('bootcamp').findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating
        })
    } catch (err) {
        console.log(err)
    }
}
reviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.bootcamp)
})
reviewSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.bootcamp)
})
reviewSchema.index({ 'bootcamp': 1, 'user': 1 }, { unique: true })

module.exports = mongoose.model('review', reviewSchema)
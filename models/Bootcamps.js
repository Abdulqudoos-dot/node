const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const geoCoder = require("../util/geoCoder");

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 charactors']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add the description'],
        unique: true,
        maxlength: [500, 'Description can not be more than 500 charactors']
    },
    website: {
        type: String,
        // match: [
        //     /https ?: \/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        //     'Please use a valid URL with HTTP or HTTPS'
        // ]
    },
    phone: {
        type: Number,
        maxlength: [20, 'the phone no can not be more than 20']
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'please enter the right email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ('Point'),
            required: true
        },
        coordinates: {
            type: [Number,],
            required: true,
            index: '2dshere',
        }
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be 1'],
        max: [10, 'Rating must be 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})
bootcampSchema.pre('remove', async function (next) {
    console.log(`course being delete of id ${this._id}`)
    await this.model('Course').deleteMany({ bootcamp: this._id })
    next()
}
)
bootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
}
)

bootcampSchema.pre('save', async function (next) {
    const loc = await geoCoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].latitude, loc[0].latitude]
    }
    this.formattedAddress = loc[0].formattedAddress
    this.street = loc[0].streetName
    this.city = loc[0].city
    this.state = loc[0].state
    this.zipcode = loc[0].zipcode
    this.country = loc[0].country
    this.address = undefined
    next()


}
)

bootcampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
}
)
module.exports = mongoose.model('bootcamp', bootcampSchema)
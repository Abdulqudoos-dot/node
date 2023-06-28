const fs = require('fs')
const mongoose = require('mongoose')
const Bootcamps = require('./models/Bootcamps')
const dotenv = require('dotenv')
const colors = require('colors')
dotenv.config({ path: './config/config.env' })
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
})

const bootcamp = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8'))

const addbootcamp = async () => {
    try {
        await Bootcamps.create(bootcamp)
        console.log('data addedd....'.green)
        process.exit()
    } catch (error) {
        console.log(error)
    }

}

const delebootcamp = async () => {
    try {
        await Bootcamps.deleteMany()
        console.log('data deleted....'.red)
        process.exit()
    } catch (error) {
        console.log(error)
    }

}

if (process.argv[2] === '-i') {
    addbootcamp()
} else if (process.argv === '-d') {
    delebootcamp()
}


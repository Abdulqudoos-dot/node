const { cyan } = require("colors");
const mongoose = require("mongoose");

const connectToDb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
    })
    console.log('connect to database', conn.connection.host.blue);
}

module.exports = connectToDb
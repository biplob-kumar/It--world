const mongoose = require('mongoose');

// const URI= "mongodb://127.0.0.1:27017/it-world"
const URI = process.env.MONGODB_URL

mongoose.connect(URI)

const ConnectDb = async () => {
    try {
        await
            mongoose.connect(URI)
        console.log("database connectuion successfull ")
    } catch (error) {
        console.log("Databse connection Faild ! ")
        process.exit(0)
    }
}

module.exports = ConnectDb
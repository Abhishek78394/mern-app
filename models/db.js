const mongoose = require("mongoose");

const mongoDb = process.env.mongoDb;
const connectDatabase = async () => {
    try {
        
        mongoose.connect(`mongodb+srv://${mongoDb}`)
        console.log("database connected!")
    } catch (error) {
        console.log(error)
    }
    
   
};

module.exports = connectDatabase;
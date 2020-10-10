const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(
            process.env.DB_CNN,{
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );

        console.log('Connected to DB')
        
    } catch (error) {
        
        throw new Error('DB connection failed')
    }
}

module.exports = {
    dbConnection
}
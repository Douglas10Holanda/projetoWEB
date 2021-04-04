const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        // conexão com o mongodb
        const con = await mongoose.connect(process.env.MONGO_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify: false,
           useCreateIndex: true 
        })

        console.log(`MongoDB conectado : ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB
const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Ready for Connection")
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Databse Connected With HOST: ",
            connect.connection.host       
        );
        console.log("Databse Connected With NAME: ",connect.connection.name);
    } catch (error) {
        console.log("Connection Error: ", error);
        process.exit(1);
    }
}

module.exports = connectDB;
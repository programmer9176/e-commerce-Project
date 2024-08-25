import mongoose from "mongoose";

const database_url = "mongodb://localhost:27017/e-commerce";

const database = mongoose.connect(database_url);
if (database) {
    console.log(`Database connected successfully`.bgGreen.white);
} else {
    console.log(`database connection failed`.bgRed.white);
}

export default database;
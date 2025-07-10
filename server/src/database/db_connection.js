import mongoose from "mongoose";

const db_connection = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("DB connected successfully"))
        .catch(err => console.error("DB connection error:", err));
}

export default db_connection;
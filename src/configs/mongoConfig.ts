import { connect, connection } from "mongoose";

// DB connection
if (process.env.MONGO_URI == undefined) {
    throw new Error("MONGO_URI is undefined");
} else {
    connect(process.env.MONGO_URI);
    const db = connection;
    db.on("error", console.error.bind(console, "MongoDB connection error: "));
}

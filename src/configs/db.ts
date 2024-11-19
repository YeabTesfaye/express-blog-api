import mongoose from "mongoose";

export const connectDB = async (dbString:string) => {
    await mongoose 
    .connect(dbString)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log("Error connecting to the database");
        console.log(err);
        process.exit();
    });
}
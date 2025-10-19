import mongoose from "mongoose";    

export const connectDB = async () =>{
        await mongoose.connect("mongodb+srv://ritulbhardwaj000_db_user:ritul1225@cluster0.scjeppr.mongodb.net/ResumeXpert ")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    })}
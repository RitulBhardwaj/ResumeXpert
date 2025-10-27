import mongoose from "mongoose";    

export const connectDB = async () =>{
        const mongoURI = process.env.MONGODB_URI || "mongodb+srv://ritulbhardwaj000_db_user:ritul1225@cluster0.scjeppr.mongodb.net/ResumeXpert ";
        
        await mongoose.connect(mongoURI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    })}
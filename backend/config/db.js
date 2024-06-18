import mongoose  from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sangeetasonal123:sangeeta12345@cluster0.m0iinsw.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}
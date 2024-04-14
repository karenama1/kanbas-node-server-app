import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    startDate: Date,
    endDate: Date, 
    department: String,
    description: String,
   },
   { collection: "courses" });

export default courseSchema;

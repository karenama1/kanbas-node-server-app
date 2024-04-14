import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: String, required: true },
},
{ collection: 'assignments' });

export default assignmentSchema;
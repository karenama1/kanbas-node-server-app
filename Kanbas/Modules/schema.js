import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: String,
    module: { type: String, required: true },
});

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    course: { type: String, required: true },
    lessons: [ lessonSchema ],
},
{ collection: "modules"});

export default moduleSchema;
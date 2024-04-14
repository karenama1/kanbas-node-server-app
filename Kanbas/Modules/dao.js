import model from "./model.js";

export const findModulesByCourseId = (courseId) => model.find({ course: courseId });
export const findModuleById = (moduleId) => model.findById(moduleId);
export const createModule = (module) => {
    delete module._id;
    return model.create(module);
};
export const deleteModule = (moduleId) => model.deleteOne( {_id: moduleId});
export const updateModule = (moduleId, updatedField) => {
    return model.updateOne({_id: moduleId }, { $set: updatedField });
};

export const createLesson = async (moduleId, newLesson) => {
    delete newLesson._id;
    const module = await model.findById(moduleId);
    module.lessons.push(newLesson);
    await module.save();
    return module.lessons[module.lessons.length - 1].id;
};

export const deleteLesson = (moduleId, lessonId) => {
    return model.updateOne({ _id: moduleId }, { $pull: { lessons: { _id: lessonId }}});
};

export const updateLesson = (moduleId, lessonId, updatedField) => {
    return model.updateOne(
        { _id: moduleId, "lessons._id": lessonId },
        { $set: { "lessons.$": updatedFields } },
    );
};
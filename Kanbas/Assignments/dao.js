import model from "./model.js";
export const createAssignment = (assignment) => {
    delete assignment._id
    return model.create(assignment);
}
export const findAllAssignments = () => model.find();
export const findAssignmentByCourseId = (courseId) => model.find({ course: courseId });
export const getAssignmentById = (assignmentId) => model.findById(assignmentId);
export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });
export const updateAssignment = (assignmentId, updatedField) => {
    return model.updateOne({ _id: assignmentId }, { $set: updatedField });
};

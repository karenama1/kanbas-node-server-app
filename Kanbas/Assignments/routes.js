import db from "../Database/index.js";
export default function AssignmentRoutes(app) {

    //Create
    app.post("/api/assignments", (req, res) => {
        const assignment = { ...req.body,
        _id: new Date().getTime().toString() };
        Database.assignments.push(assignment);
        res.status(201).send(assignment); // 201 created
    });

    //Retrieve 
    app.get("/api/Courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = db.assignments
        .filter((assignment) => assignment.course === courseId);
        res.send(assignments);
    });

    //Update
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentIndex = db.assignments.findIndex(
        (assignemnt) => assignment._id === assignmentId);
        
        if (assignmentIndex === -1) {
            res.status(404).send({ message: 'Assignment not found' });
        } else {
            db.assignments[assignmentIndex] = { ...db.assignments[assignmentIndex], ...req.body };
            res.status(200).send(db.assignments[assignmentIndex]); // 200 OK with the updated assignment
        }
    });
    

    //Delete:
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const initialLength = db.assignments.length;
        db.assignments = db.assignments.filter(assignment => assignment._id !== assignmentId);

        if (db.assignments.length === initialLength) {
            res.status(404).send({ message: 'Assignment not found' });
        } else {
            res.sendStatus(204); // 204 No Content
        }
    });
}
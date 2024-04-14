// import db from "../Database/index.js";
import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {

    // Create an assignment group for a course
   app.post("/api/courses/:courseId/assignments", async (req, res) => {
       const { courseId } = req.params;
       const newAssignmentGroup = { ...req.body, course: courseId };
       const result = await dao.createAssignment(newAssignmentGroup);
       res.json(result);
   });



    // app.post("/api/assignments", (req, res) => {
    //     const assignment = { ...req.body,
    //     _id: new Date().getTime().toString() };
    //     Database.assignments.push(assignment);
    //     res.status(201).send(assignment); // 201 created
    // });

    //Retrieve all assignments from a course
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        console.log("Requested courseId:", courseId); // Log the courseId to ensure it's what you expect.
    
        try {
            const assignments = await dao.findAssignmentByCourseId(courseId);
            console.log("Assignments fetched for courseId", courseId, ":", assignments); // Log the result of the query.
            res.json(assignments);
        } catch (error) {
            console.error("Error fetching assignments for courseId", courseId, ":", error); // Log any error that occurs during the query.
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
        
    //     const assignments = db.assignments
    //     .filter((assignment) => assignment.course === courseId);
    //     res.send(assignments);

    // Get specific assignment by assignment id
    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const { courseId } = req.params;
        try {
            const assignments = await dao.findAssignmentByCourseId(courseId);
            res.json(assignments);
            } catch (error) {
            console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
        // const assignment = db.assignments.find((assignment) => assignment._id === assignmentId);
    
        // if (assignment) {
        //     res.status(200).send(assignment);
        // } else {
        //     res.status(404).send({ message: 'Assignment not found' });
        // }
    });

    //Update assignment group
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const updatedField = req.body;
        const status = await dao.updateAssignment(assignmentId, updatedField);
        res.json(status);
        // const { title, course } = req.body;
        // const assignmentIndex = db.assignments.findIndex(
        // assignment => assignment._id === assignmentId);
        
        // if (assignmentIndex === -1) {
        //     res.status(404).send({ message: 'Assignment not found' });
        //     return;
        // }
        // db.assignments[assignmentIndex].title = title;
        // db.assignments[assignmentIndex].course = course;

        // res.json(db.assignments[assignmentIndex]);
    });
    

    //Delete an assignment 
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.json(status);
        // const initialLength = db.assignments.length;
        // db.assignments = db.assignments.filter(assignment => assignment._id !== assignmentId);

        // if (db.assignments.length === initialLength) {
        //     res.status(404).send({ message: 'Assignment not found' });
        // } else {
        //     res.sendStatus(204); // 204 No Content
        // }
    });
}
import * as dao from "./dao.js";

export default function CourseRoutes(app) {

  //Get one course by course id
  app.get("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = await dao.findCourseById(id);
    if (course) {
      res.json(course);
    } else {
      res.sendStatus(404).json({ messge: "Course not found!" });
    }
   });

   //Update a course
   app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;

    const status = await dao.updateCourse(id, course);
    res.json(status);
   });
    // Database.courses = Database.courses.map((c) =>
    //     c._id === id ? { ...c, ...course } : c
    // );
    // res.sendStatus(204);
    // });    

    //Delete a course
   app.delete("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const status = await dao.deleteCourse(id);
        res.json(status);

        // Database.courses = Database.courses
        //   .filter((c) => c._id !== id);
        // res.sendStatus(204);
    });
    
  // Create new course
   app.post("/api/courses", async (req, res) => {
       const course = await dao.createCourse(req.body);
       res.json(course);
    // const course = { ...req.body,
      // _id: new Date().getTime().toString() };
      // Database.courses.push(course);
      // res.send(course);
   });
    
    
  //Get all courses
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
    // const courses = Database.courses;
    // res.send(courses);
  });
}

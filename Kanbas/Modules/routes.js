// import db from "../Database/index.js";
import * as dao from "./dao.js";
function ModuleRoutes(app) {

    // Get module by courseid
   
    app.get("/api/courses/:cid/modules", async (req, res) => {
      const { cid } = req.params;
      const modules = await dao.findModulesByCourseId(cid);
      res.json(modules);
      // const modules = db.modules
      //   .filter((m) => m.course === cid);
      // res.send(modules);
    });
    
  // Delete module
   app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const status = await dao.deleteModule(mid);
        res.json(status);
        // db.modules = db.modules.filter((m) => m._id !== mid);
        // res.sendStatus(200);
 });
  
 //Create modules for a course
   app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const newModule = { ...req.body, course: cid };
        const module = await dao.createModule(newModule)
        res.json(module);
        // const newModule = {
        //   ...req.body,
        //   course: cid,
        //   _id: new Date().getTime().toString(),
        // };
        // db.modules.push(newModule);
        // res.send(newModule);
      });
    
      //Update module
   app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const updatedField = req.body;
    const status = await dao.updateModule(mid, updatedField);
    res.json(status);
    // const moduleIndex = db.modules.findIndex(
    //   (m) => m._id === mid);
    // db.modules[moduleIndex] = {
    //   ...db.modules[moduleIndex],
    //   ...req.body
    // };
    // res.sendStatus(204);
  });


  //Create lesson in a module
  app.post("/api/modules/:mid/lessons", async (req, res) => {
    const { mid } = req.params;
    const newLesson = req.body;
    newLesson.module = mid;
    const lessonId = await dao.createLesson(mid, newLesson);
    newLesson._id = lessonId;
    res.send(newLesson);
  });

  //Delete a lesson
  app.delete("/api/modules/:mid/lessons/:lid", async (req, res) => {
    const { mid, lid } = req.params;
    const status = await dao.deleteLesson(mid, lid);
    res.json(status);
  });

   // Update Lesson
   app.put("/api/modules/:mid/lessons/:lid", async (req, res) => {
    const { mid, lid } = req.params;
    const updatedField = req.body;
    const status = await dao.updateLesson(mid, lid, updatedField);
    res.json(status);
    });
}
export default ModuleRoutes;
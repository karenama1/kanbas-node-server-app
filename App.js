import express from 'express';
import mongoose, { MongooseError } from 'mongoose';
import Hello from "./Hello.js";
import session from 'express-session';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import UserRoutes from "./Users/routes.js";
import "dotenv/config";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
const DB_NAME = process.env.DB_NAME;

mongoose.connect(CONNECTION_STRING, {dbName: DB_NAME});
// mongoose.connect('mongodb://127.0.0.1:27017/kanbas');

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }));

const sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        proxy: true,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
};
}
app.use(
    session(sessionOptions)
);
app.use(express.json());


UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);


app.listen(process.env.PORT || 4000);
import express from "express";
import isUserAuthenticated from "../middleware/isUserAuthenticated.js";
import { addSleepRecord,  getPatientsWithRecords,  getUserSleepRecords } from "../controllers/sleep.controller.js";

const sleepRouter = express.Router();

sleepRouter.post("/add-record", isUserAuthenticated, addSleepRecord)
sleepRouter.get("/get-user-record", isUserAuthenticated, getUserSleepRecords);
sleepRouter.get("/all-users-record",isUserAuthenticated, getPatientsWithRecords);


export default sleepRouter;


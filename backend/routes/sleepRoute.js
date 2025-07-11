import express from "express";
import isUserAuthenticated from "../middleware/isUserAuthenticated.js";
import { addSleepRecord, getUserSleepRecords } from "../controllers/sleep.controller.js";

const sleepRouter = express.Router();

sleepRouter.post("/add-record", isUserAuthenticated, addSleepRecord)
sleepRouter.get("/get-user-record", isUserAuthenticated, getUserSleepRecords);

export default sleepRouter;


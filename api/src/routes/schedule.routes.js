const { Router } = require("express");

const ScheduleController = require("../controllers/ScheduleController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const scheduleRoutes = Router();

const scheduleController = new ScheduleController();

scheduleRoutes.use(ensureAuthenticated);

scheduleRoutes.post("/", scheduleController.create);
scheduleRoutes.get("/groups/:day", scheduleController.indexGroupsByDay);
scheduleRoutes.get("/exercises/:day/bygroup/:group", scheduleController.indexExerciseByGroup);
scheduleRoutes.put("/", scheduleController.update);
scheduleRoutes.delete("/exercises/:day/:exerciseId", scheduleController.delete);

module.exports = scheduleRoutes;
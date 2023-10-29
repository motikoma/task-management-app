import express from "express";
import { getTaskController } from "./presentation/task/getTaskController";
import { getTaskListController } from "./presentation/task/getTaskListController";
import { postTaskController } from "./presentation/task/postTaskController";
import { completeTaskController } from "./presentation/task/completeTaskController";
import { postPoneTaskController } from "./presentation/task/postPoneTaskController";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/tasks/:taskId", getTaskController);
app.get("/api/tasks", getTaskListController);
app.post("/api/tasks", postTaskController);
app.put("/api/tasks/:taskId/complete", completeTaskController);
app.put("/api/tasks/:taskId/postpone", postPoneTaskController);

app.listen(port, () =>
  console.log(`Task Management App listening on port ${port}!`)
);

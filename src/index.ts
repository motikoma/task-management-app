import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { getTaskController } from "./presentation/task/getTaskController";
import { getTaskListController } from "./presentation/task/getTaskListController";
import { postTaskController } from "./presentation/task/postTaskController";
import { completeTaskController } from "./presentation/task/completeTaskController";
import { postPoneTaskController } from "./presentation/task/postPoneTaskController";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { postTaskApi } from './api/taskManagement/postTask/postTaskApi';
import { getTaskApi } from './api/taskManagement/getTask/getTaskApi';

// TODO: prismaClientを初期化して使い回す

const app = express();
const port = 3003;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  // TODO: PrismClientの他のエラーパターンをハンドリングする
  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(400).json({ error: err.stack });
  }

  res.status(500).json({ error: err.stack || 'Internal Server Error' });
};


app.use(express.json());

// レイヤードアーキテクチャ+静的な構造によるドメインオブジェクトの分類
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/tasks/:taskId", getTaskController);
app.get("/api/tasks", getTaskListController);
app.post("/api/tasks", postTaskController);
app.put("/api/tasks/:taskId/complete", completeTaskController);
app.put("/api/tasks/:taskId/postpone", postPoneTaskController);

// DMMF本に近いスタイル
app.post("/api2/tasks", postTaskApi);
app.get("/api2/tasks/:taskId", getTaskApi);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Task Management App listening on port ${port}!`)
);

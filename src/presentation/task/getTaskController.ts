import { Request, Response } from "express";
import { getTaskUseCase } from "../../application/task/getTaskUseCase";
import { TaskId } from "../../domain/task/task";
import { PrismaClient } from "@prisma/client";
import { fetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";

interface TaskRequestParams {
  taskId: string;
}

export const getTaskController = async (
  req: Request<TaskRequestParams, {}, {}>,
  res: Response
) => {
  const prisma = new PrismaClient();
  const taskId = TaskId.parse(req.params.taskId);

  const result = await getTaskUseCase(fetchTaskQuery(prisma))(taskId);

  res.status(200).json({ result });
};

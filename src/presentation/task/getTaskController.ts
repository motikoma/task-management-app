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

  if (!req.params.taskId || typeof req.params.taskId !== "string") {
    res.status(400).json({});
    return;
  }

  const taskId = TaskId.parse(req.params.taskId);

  try {
    const result = await getTaskUseCase(fetchTaskQuery(prisma))(taskId);
    res.status(200).json({ result });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({});
    }
  }
};

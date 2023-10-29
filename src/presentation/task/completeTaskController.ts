import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TaskId } from "../../domain/task/task";
import { completeTaskUseCase } from "../../application/task/completeTaskUseCase";
import { fetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";
import { completeTaskRepository } from "../../infra/task/repository/completeTaskRepository";

export type RequestParams = {
  taskId: string;
};

export const completeTaskController = async (
  req: Request<RequestParams, {}, {}>,
  res: Response
) => {
  const prisma = new PrismaClient();

  const result = await completeTaskUseCase(
    fetchTaskQuery(prisma),
    completeTaskRepository(prisma)
  )(TaskId.parse(req.params.taskId));

  res.status(200).json({ result });
};

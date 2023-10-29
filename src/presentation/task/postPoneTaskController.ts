import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TaskId } from "../../domain/task/task";
import { postPoneTaskUseCase } from "../../application/task/postPoneTaskUseCase";
import { fetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";
import { postPoneTaskRepository } from "../../infra/task/repository/postPoneTaskRepository";

export type RequestParams = {
  taskId: string;
};

export const postPoneTaskController = async (
  req: Request<RequestParams, {}, {}>,
  res: Response
) => {
  const prisma = new PrismaClient();

  const result = await postPoneTaskUseCase(
    fetchTaskQuery(prisma),
    postPoneTaskRepository(prisma)
  )(TaskId.parse(req.params.taskId));

  res.status(200).json({ result });
};

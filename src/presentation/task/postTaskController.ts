import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { postTaskUseCase } from "../../application/task/postTaskUseCase";
import { fetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";
import { postTaskRepository } from "../../infra/task/repository/postTaskRepository";

export type RequestBody = {
  name: string;
};

export type Command = {
  id: string;
  isDone: boolean;
  name: string;
  dueDate: Date;
  postPoneCount: number;
};

export const postTaskController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  const prisma = new PrismaClient();

  const oneWeekLater = new Date(new Date().getTime() + 7 * 24 * 60 * 50 * 1000);
  const command: Command = {
    id: uuidv4(),
    isDone: false,
    name: req.body.name,
    dueDate: oneWeekLater,
    postPoneCount: 0,
  };

  const result = await postTaskUseCase(
    fetchTaskQuery(prisma),
    postTaskRepository(prisma)
  )(command);

  res.status(201).json({ result });
};
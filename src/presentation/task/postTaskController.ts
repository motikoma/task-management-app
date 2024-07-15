import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { postTaskUseCase } from "../../application/task/postTaskUseCase";
import { fetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";
import { postTaskRepository } from "../../infra/task/repository/postTaskRepository";
import { Command } from "../../domain/task/task";

export type RequestBody = {
  name: string;
};

export const postTaskController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  next: NextFunction
) => {
  const prisma = new PrismaClient();

  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  const command: Command = {
    id: uuidv4(),
    isDone: false,
    name: req.body.name,
    dueDate: oneWeekLater,
    postPoneCount: 0,
  };

  try {
    const result = await postTaskUseCase(
      fetchTaskQuery(prisma),
      postTaskRepository(prisma)
    )(command);
  
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  } 
};

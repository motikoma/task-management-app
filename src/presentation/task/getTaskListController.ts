import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getTaskListUseCase } from "../../application/task/getTaskListUseCase";
import { fetchTaskListQuery } from "../../infra/task/query/fetchTaskListQuery";

export const getTaskListController = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  const result = await getTaskListUseCase(fetchTaskListQuery(prisma))();

  res.status(200).json({ result });
};

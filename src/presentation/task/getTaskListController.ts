import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getTaskListUseCase } from "../../application/task/getTaskListUseCase";
import { fetchTaskListQuery } from "../../infra/task/query/fetchTaskListQuery";

export const getTaskListController = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  // neverthrowのResultAsyncを使っているので、isErr()でエラーかどうかを判定できる
  const result = await getTaskListUseCase(fetchTaskListQuery(prisma))();
  if (result.isErr()) {
    console.error(result.error);
    return res.status(500).json({});
  }

  res.status(200).json({ result });
};

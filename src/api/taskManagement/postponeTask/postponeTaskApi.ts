import { NextFunction, Request, Response } from "express";
import { postponeTaskWorkflow } from "./implementation";
import { TaskId } from "../common/publicTypes";
import { postponeTaskRepository } from "./postponeTaskRepository";
import { fetchTaskQuery } from "../getTask/fetchTaskQuery";
import { prisma } from "../../../client";

export type RequestParams = {
  taskId: string;
};

export const postponeTaskApi = async (
    req: Request<RequestParams, {}, {}>,
    res: Response,
    next: NextFunction 
) => {
    // TODO: フレームワーク側でreqに対してバリデーションを行う

    try {
        // MEMO: ブランド化したドメインオブジェクトはそのままレスポンスに返せる
        const result = await postponeTaskWorkflow(
          fetchTaskQuery(prisma),
          postponeTaskRepository(prisma)
        )(TaskId.parse(req.params.taskId));    

        res.status(200).json({ result });
      } catch (error) {
        next(error);
      } 
}
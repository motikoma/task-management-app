import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getTaskWorkflow } from "./implementation";
import { fetchTaskQuery } from "./fetchTaskQuery";
import { TaskId } from "../common/publicTypes";

export type RequestBody = {
    taskId: string;
}

export const getTaskApi = async (
    req: Request<{},{}, RequestBody>,
    res: Response,
    next: NextFunction 
) => {
    // TODO: フレームワーク側でreqに対してバリデーションを行う

    const prisma = new PrismaClient();

    try {
        const taskId = TaskId.parse(req.body.taskId);

        const result = await getTaskWorkflow(
          fetchTaskQuery(prisma)
        )(taskId);
      
        res.status(200).json({ result });
      } catch (error) {
        next(error);
      } 
}
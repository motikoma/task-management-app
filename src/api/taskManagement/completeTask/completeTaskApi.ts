import { NextFunction, Request, Response } from "express";
import { TaskId } from "../common/publicTypes";
import { fetchTaskQuery } from "../getTask/fetchTaskQuery";
import { prisma } from "../../../client";
import { completeTaskWorkflow } from "./implementation";

export type TaskRequestParams = {
    taskId: string;
}

export const CompleteTaskApi = async (
    req: Request<Request, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const taskId = TaskId.parse(req.params.taskId);
        
        const result = await completeTaskWorkflow(
            fetchTaskQuery(prisma),
            completeTaskRepository(prisma)
        )(taskId);

        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
        
}
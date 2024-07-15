import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { postTaskWorkflow } from "./implementation";
import { ValidatedTask, VALIDATED_TASK } from "./publicTypes";
import { postTaskRepository } from "./postTaskRepository";
import { TaskDto, TaskId } from "../common/publicTypes";

export type RequestBody = {
    name: string;
}

export const postTaskApi = async (
    req: Request<{},{}, RequestBody>,
    res: Response,
    next: NextFunction 
) => {
    // TODO: フレームワーク側でreqに対してバリデーションを行う

    const prisma = new PrismaClient();

    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const unvalidatedTask: ValidatedTask = {
        kind: VALIDATED_TASK,
        id: TaskId.parse(uuidv4()),
        isDone: false,
        name: req.body.name,
        dueDate: oneWeekLater,
        postPoneCount: 0,
    };
    const validatedTask = ValidatedTask.parse(unvalidatedTask);

    try {
        // MEMO: ワークフローはドメインオブジェクト(またはコマンド)を引数に持つ
        const createdTask = await postTaskWorkflow(
          postTaskRepository(prisma)
        )(validatedTask);

        const taskDto: TaskDto = {
          id: TaskId.parse(createdTask.id),
          name: createdTask.name,
          dueDate: createdTask.dueDate,
          postPoneCount: createdTask.postPoneCount,
          isDone: createdTask.isDone,
        }

        res.status(201).json({ taskDto });
      } catch (error) {
        next(error);
      } 
}
import { PrismaClient, Task } from "@prisma/client";
import { TaskId } from "../../../domain/task/task";
import { ResultAsync } from "neverthrow";

export type FetchTaskQuery = (taskId: TaskId) => Promise<Task>;
export const fetchTaskQuery =
  (prisma: PrismaClient) => async (taskId: TaskId) => {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new Error(`taskId: ${taskId} is not found`);
    }

    return task;
  };

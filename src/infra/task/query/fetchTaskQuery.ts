import { PrismaClient, Task } from "@prisma/client";
import { TaskId } from "../../../domain/task/task";

export type FetchTaskQuery = (taskId: TaskId) => Promise<Task>;
export const fetchTaskQuery =
  (prisma: PrismaClient) => async (taskId: TaskId) => {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new Error("task not found");
    }

    return task;
  };

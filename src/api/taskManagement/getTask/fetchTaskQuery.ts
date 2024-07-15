import { PrismaClient, Task } from "@prisma/client";
import { TaskId } from "../common/publicTypes";

export type FetchTaskQuery = (taskId: TaskId) => Promise<Task>;
export const fetchTaskQuery =
  (prisma: PrismaClient): FetchTaskQuery => async (taskId: TaskId) => {
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

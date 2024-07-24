import { PrismaClient, Task } from "@prisma/client";
import { TaskId } from "../common/publicTypes";

// MEMO: クエリの型はPrismaに依存するため、ここに記載する
export type FetchTaskQuery = (taskId: TaskId) => Promise<Task>;
export const fetchTaskQuery =
  (prisma: PrismaClient): FetchTaskQuery => async (taskId: TaskId) => {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    // TODO: 404エラーを返す
    if (!task) {
      throw new Error(`taskId: ${taskId} is not found`);
    }

    return task;
  };

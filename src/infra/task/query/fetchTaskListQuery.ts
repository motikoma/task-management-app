import { PrismaClient, Task } from "@prisma/client";

export type FetchTaskListQuery = () => Promise<Task[]>;
export const fetchTaskListQuery = (prisma: PrismaClient) => async () => {
  try {
    const taskList = await prisma.task.findMany();

    return taskList;
  } catch (error: any) {
    throw new Error(error);
  }
};

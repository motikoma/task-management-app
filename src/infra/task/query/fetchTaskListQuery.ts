import { PrismaClient, Task } from "@prisma/client";
import { ResultAsync } from "neverthrow";

export type FetchTaskListQuery = () => ResultAsync<Task[], Error>;
export const fetchTaskListQuery = (prisma: PrismaClient) => () => {
  // const taskList = await prisma.task.findMany();
  return ResultAsync.fromPromise(
    prisma.task.findMany(),
    (error) =>
      new Error("error", {
        cause: error,
      })
  );
};

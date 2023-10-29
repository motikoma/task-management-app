import { PrismaClient } from "@prisma/client";
import {
  POSTPONABLE_UNDONE_TASK,
  PostPonableUnDoneTask,
} from "../../../domain/task/task";

export const postTaskRepository =
  (prisma: PrismaClient) =>
  async (postPonableUnDoneTask: PostPonableUnDoneTask) => {
    try {
      const task = await prisma.task.create({
        data: {
          id: postPonableUnDoneTask.id,
          isDone: false,
          name: postPonableUnDoneTask.name,
          dueDate: postPonableUnDoneTask.dueDate,
          postPoneCount: postPonableUnDoneTask.postPoneCount,
        },
      });

      return PostPonableUnDoneTask.parse({
        kind: POSTPONABLE_UNDONE_TASK,
        id: task.id,
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

import { PrismaClient } from "@prisma/client";
import {
  CreatePostTaskRepository,
  POSTPONABLE_UNDONE_TASK,
  PostPonableUnDoneTask,
  TaskId,
} from "../../../domain/task/task";

export const postTaskRepository: CreatePostTaskRepository =
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

      const unvalidatedTask: PostPonableUnDoneTask = {
        kind: POSTPONABLE_UNDONE_TASK,
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
      };

      return PostPonableUnDoneTask.parse(unvalidatedTask);
    } catch (error: any) {
      throw new Error(error);
    }
  };

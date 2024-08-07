import { PrismaClient } from "@prisma/client";
import {
  CreateCompleteTaskRepository,
  DONE_TASK,
  DoneTask,
  TaskId,
} from "../../../domain/task/task";

export const completeTaskRepository: CreateCompleteTaskRepository =
  (prisma: PrismaClient) => async (doneTask: DoneTask) => {
    try {
      const task = await prisma.task.update({
        where: { id: doneTask.id },
        data: {
          isDone: true,
        },
      });

      const unvalidatedTask: DoneTask = {
        kind: DONE_TASK,
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
      };

      const result = DoneTask.parse(unvalidatedTask);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  };

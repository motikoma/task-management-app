import { PrismaClient } from "@prisma/client";
import { DoneTask, TaskId } from "../../../domain/task/task";

export const completeTaskRepository =
  (prisma: PrismaClient) => async (doneTask: DoneTask) => {
    try {
      const task = await prisma.task.update({
        where: { id: doneTask.id },
        data: {
          isDone: true,
        },
      });

      const result = DoneTask.parse({
        kind: "DoneTask",
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  };

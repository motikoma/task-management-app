import { PrismaClient, Task } from "@prisma/client";
import {
  PostPonableUnDoneTask,
  UnDoneTask,
  UndoneTaskWithDeadline,
} from "../../../domain/task/task";

export const postPoneTaskRepository =
  (prisma: PrismaClient) => async (unDoneTask: UnDoneTask) => {
    try {
      if (unDoneTask.kind === "PostPonableUnDoneTask") {
        const task = await prisma.task.update({
          where: { id: unDoneTask.id },
          data: {
            dueDate: unDoneTask.dueDate,
            postPoneCount: unDoneTask.postPoneCount,
          },
        });

        return PostPonableUnDoneTask.parse({
          kind: "PostPonableUnDoneTask",
          id: task.id,
          name: task.name,
          dueDate: task.dueDate,
          postPoneCount: task.postPoneCount,
        });
      } else {
        const task = await prisma.task.update({
          where: { id: unDoneTask.id },
          data: {
            dueDate: unDoneTask.dueDate,
            postPoneCount: 3,
          },
        });

        return UndoneTaskWithDeadline.parse({
          kind: "UndoneTaskWithDeadline",
          id: task.id,
          name: task.name,
          dueDate: task.dueDate,
          postPoneCount: task.postPoneCount,
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

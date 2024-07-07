import { PrismaClient } from "@prisma/client";
import {
  POSTPONABLE_UNDONE_TASK,
  PostPonableUnDoneTask,
  UNDONE_TASK_WITH_DEADLINE,
  UnDoneTask,
  UnDoneTaskWithDeadline,
  POSTPONE_COUNT_LIMIT,
  CreatePostPoneTaskRepository,
  TaskId,
} from "../../../domain/task/task";

export const postPoneTaskRepository: CreatePostPoneTaskRepository =
  (prisma: PrismaClient) => async (unDoneTask: UnDoneTask) => {
    try {
      if (unDoneTask.kind === POSTPONABLE_UNDONE_TASK) {
        const task = await prisma.task.update({
          where: { id: unDoneTask.id },
          data: {
            dueDate: unDoneTask.dueDate,
            postPoneCount: unDoneTask.postPoneCount,
          },
        });

        return PostPonableUnDoneTask.parse({
          kind: POSTPONABLE_UNDONE_TASK,
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
            postPoneCount: POSTPONE_COUNT_LIMIT,
          },
        });

        const unvalidatedTask: UnDoneTaskWithDeadline = {
          kind: UNDONE_TASK_WITH_DEADLINE,
          id: TaskId.parse(task.id),
          name: task.name,
          dueDate: task.dueDate,
        };

        return UnDoneTaskWithDeadline.parse(unvalidatedTask);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

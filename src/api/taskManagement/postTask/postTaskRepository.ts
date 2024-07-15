import { PrismaClient } from "@prisma/client";
import { ValidatedTask, CREATED_TASK, CreatedTask, PostTaskRepository } from "./publicTypes";
import { TaskId } from "../common/publicTypes";

export const postTaskRepository =
  (prisma: PrismaClient): PostTaskRepository =>
  async (input: ValidatedTask) => {
      const task = await prisma.task.create({
        data: {
          id: TaskId.parse(input.id),
          name: input.name,
          dueDate: input.dueDate,
          postPoneCount: input.postPoneCount,
          isDone: false,
        },
      });

      // MEMO: ドメインオブジェクトに変換は必要？
      const createdTask: CreatedTask = {
        kind: CREATED_TASK,
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
        isDone: task.isDone,
      };

      return CreatedTask.parse(createdTask);
  };

import { PrismaClient } from "@prisma/client";
import { CREATED_TASK, CreatedTask, CreatedTaskInput, CreatedTaskSchema, PostTaskRepository, ValidatedTaskInput } from "./publicTypes";
import { TaskId } from "../common/publicTypes";

export const postTaskRepository =
  (prisma: PrismaClient): PostTaskRepository =>
  async (input: ValidatedTaskInput) => {
    // MEMO: 本来はトランザクションは不要だがサンプルとして記述
    return prisma.$transaction(async (prisma) => {
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
      const createdTask: CreatedTaskInput = {
        kind: CREATED_TASK,
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
        isDone: task.isDone,
      };

      return CreatedTaskSchema.parse(createdTask);
    });
  };

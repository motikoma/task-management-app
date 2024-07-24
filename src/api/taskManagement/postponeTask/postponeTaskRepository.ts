import { PrismaClient } from "@prisma/client";
import { PostponedTaskInput, PostponedTaskSchema, PostponeTaskRepository, ValidatedTask } from "./publicTypes";
import { TaskId } from "../common/publicTypes";

export const postponeTaskRepository =
  (prisma: PrismaClient): PostponeTaskRepository =>
  async (input: ValidatedTask) => {
    // MEMO: 本来はトランザクションは不要だがサンプルとして記述
    return prisma.$transaction(async (prisma) => {
      const task = await prisma.task.update({
        where: {
          id: TaskId.parse(input.id),
        },
        data: {
          postPoneCount: input.postPoneCount + 1,
        },
      });

      // MEMO: ドメインオブジェクトに変換は必要？
      const postponedTask: PostponedTaskInput = {
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
        isDone: task.isDone,
      };

      return PostponedTaskSchema.parse(postponedTask);
    });
  };

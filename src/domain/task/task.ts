import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// TODO: ワークフローが増えたらファイルを分割する

/**
 * ワークフロー
 */

export type Command = {
  id: string;
  isDone: boolean;
  name: string;
  dueDate: Date;
  postPoneCount: number;
};
export type Post = (command: Command) => PostPonableUnDoneTask;
export const post: Post = (command: Command) => {
  return PostPonableUnDoneTask.parse({
    kind: POSTPONABLE_UNDONE_TASK,
    id: command.id,
    name: command.name,
    dueDate: command.dueDate,
    postPoneCount: command.postPoneCount,
  });
};

export type Postpone = (task: PostPonableUnDoneTask) => UnDoneTask;
export const postpone: Postpone = (task: PostPonableUnDoneTask) => {
  const newDueDate = new Date(task.dueDate);
  newDueDate.setDate(newDueDate.getDate() + 1);

  if (task.postPoneCount === 2) {
    return UnDoneTaskWithDeadline.parse({
      kind: "UnDoneTaskWithDeadline",
      id: TaskId.parse(task.id),
      name: task.name,
      dueDate: newDueDate,
      postPoneCount: task.postPoneCount + 1,
    });
  } else {
    return PostPonableUnDoneTask.parse({
      kind: "PostPonableUnDoneTask",
      id: TaskId.parse(task.id),
      name: task.name,
      dueDate: newDueDate,
      postPoneCount: task.postPoneCount + 1,
    });
  }
};

export type Complete = (task: UnDoneTask) => DoneTask;
export const complete: Complete = (task: UnDoneTask): DoneTask => {
  return DoneTask.parse({
    kind: "DoneTask",
    id: TaskId.parse(task.id),
    name: task.name,
    dueDate: task.dueDate,
  });
};

/**
 * リポジトリ
 */
export type PostTaskRepository = (
  postPonableUnDoneTask: PostPonableUnDoneTask
) => Promise<PostPonableUnDoneTask>;
export type CompleteTaskRepository = (doneTask: DoneTask) => Promise<DoneTask>;
export type PostPoneTaskRepository = (
  UnDoneTask: UnDoneTask
) => Promise<UnDoneTask>;

/**
 * リポジトリの生成
 */
export type CreatePostTaskRepository = (
  prismaClient: PrismaClient
) => PostTaskRepository;
export type CreateCompleteTaskRepository = (
  prismaClient: PrismaClient
) => CompleteTaskRepository;
export type CreatePostPoneTaskRepository = (
  prismaClient: PrismaClient
) => PostPoneTaskRepository;

/**
 * データ構造
 */
export const TaskId = z.string().uuid().brand("TaskId");
export type TaskId = z.infer<typeof TaskId>;

export const TaskName = z.string().min(1).max(50);
export type TaskName = z.infer<typeof TaskName>;

export const POSTPONABLE_UNDONE_TASK = "PostPonableUnDoneTask";
export const PostPonableUnDoneTask = z.object({
  kind: z.literal(POSTPONABLE_UNDONE_TASK),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number().min(0).max(2),
});
export type PostPonableUnDoneTask = z.infer<typeof PostPonableUnDoneTask>;

export const POSTPONE_COUNT_LIMIT = 3;
export const UNDONE_TASK_WITH_DEADLINE = "UnDoneTaskWithDeadline";
export const UnDoneTaskWithDeadline = z.object({
  kind: z.literal(UNDONE_TASK_WITH_DEADLINE),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
});
export type UnDoneTaskWithDeadline = z.infer<typeof UnDoneTaskWithDeadline>;

export const DONE_TASK = "DoneTask";
export const DoneTask = z.object({
  kind: z.literal(DONE_TASK),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
});
export type DoneTask = z.infer<typeof DoneTask>;

export type Task = UnDoneTask | DoneTask;
export const TASK =
  POSTPONABLE_UNDONE_TASK || UNDONE_TASK_WITH_DEADLINE || DONE_TASK;

export type UnDoneTask = PostPonableUnDoneTask | UnDoneTaskWithDeadline;
export const UNDONE_TASK = POSTPONABLE_UNDONE_TASK || UNDONE_TASK_WITH_DEADLINE;

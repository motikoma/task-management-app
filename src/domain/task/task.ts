import { task } from "fp-ts";
import { z } from "zod";

/**
 * ワークフロー
 */
export type Postpone = (task: PostPonableUnDoneTask) => UnDoneTask;
export const postpone: Postpone = (task: PostPonableUnDoneTask) => {
  const newDueDate = new Date(task.dueDate.getTime() + 24 * 60 * 60 * 1000);

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
 * データ構造
 */
export const TaskId = z.string().uuid().brand("TaskId");
export type TaskId = z.infer<typeof TaskId>;

export const TaskName = z.string().min(1).max(50);
export type TaskName = z.infer<typeof TaskName>;

export type Task = UnDoneTask | DoneTask;

export type UnDoneTask = PostPonableUnDoneTask | UnDoneTaskWithDeadline;

export const PostPonableUnDoneTask = z.object({
  kind: z.literal("PostPonableUnDoneTask"),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number().min(0).max(2),
});
export type PostPonableUnDoneTask = z.infer<typeof PostPonableUnDoneTask>;

export const UnDoneTaskWithDeadline = z.object({
  kind: z.literal("UnDoneTaskWithDeadline"),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
});
export type UnDoneTaskWithDeadline = z.infer<typeof UnDoneTaskWithDeadline>;

export const DoneTask = z.object({
  kind: z.literal("DoneTask"),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
});
export type DoneTask = z.infer<typeof DoneTask>;

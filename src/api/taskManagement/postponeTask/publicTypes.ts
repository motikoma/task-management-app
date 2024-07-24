import { z } from "zod";
import { TaskId } from "../common/publicTypes";

/**
 * ドメインオブジェクト
 */
export const VALIDATED_TASK = "ValidatedTask" as const;
export const CREATED_TASK = "CreatedTask" as const;
export const POSTPONED_TASK = "PostponedTask" as const;

// MEMO: 動詞過去形+名刺+schemaの命名規則が良さそう
export const ValidatedTaskSchema = z.object({
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number().int().nonnegative().max(2, {message: "最大3回まで延期できます"}),
  isDone: z.boolean().refine(value => !value, {message: "未完了のタスクのみ延期できます"})
}).brand(VALIDATED_TASK);
export type ValidatedTask = z.infer<typeof ValidatedTaskSchema>;
export type ValidatedTaskInput = z.input<typeof ValidatedTaskSchema>;

export const PostponedTaskSchema = z.object({
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number().int().nonnegative().max(3, {message: "最大3回まで延期できます"}),
  isDone: z.boolean().refine(value => !value, {message: "未完了のタスクのみ延期できます"})
}).brand(POSTPONED_TASK);
export type PostponedTask = z.infer<typeof PostponedTaskSchema>;
export type PostponedTaskInput = z.input<typeof PostponedTaskSchema>;

/**
 * リポジトリ
 */
export type PostponeTaskRepository = (input: ValidatedTask) => Promise<PostponedTask>;

/**
 * ワークフロー
 */
export type PostponeTaskWorkflow = (command: TaskId) => Promise<PostponedTask>;
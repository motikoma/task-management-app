import { z } from "zod";
import { TaskId } from "../common/publicTypes";

/**
 * ドメインオブジェクト
 */
export const VALIDATED_TASK = "ValidatedTask" as const;
export const CREATED_TASK = "CreatedTask" as const;

// MEMO: brand型を使用せずにkindなどで判別するパターン
export const ValidatedTaskSchema = z.object({
  kind: z.literal(VALIDATED_TASK),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number(),
  isDone: z.boolean()
});
export type ValidatedTask = z.infer<typeof ValidatedTaskSchema>;
export type ValidatedTaskInput = z.input<typeof ValidatedTaskSchema>;

export const CreatedTaskSchema = z.object({
  kind: z.literal(CREATED_TASK),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number(),
  isDone: z.boolean()
});
export type CreatedTask = z.infer<typeof CreatedTaskSchema>;
export type CreatedTaskInput = z.input<typeof CreatedTaskSchema>;

/**
 * リポジトリ
 */
export type PostTaskRepository = (input: ValidatedTask) => Promise<CreatedTask>;

/**
 * ワークフロー
 */
export type PostTaskWorkflow = (input: ValidatedTask) => Promise<CreatedTask>;
import { z } from "zod";
import { TaskId } from "../common/publicTypes";

/**
 * ドメインオブジェクト
 */
export const VALIDATED_TASK = "ValidatedTask" as const;
export const CREATED_TASK = "CreatedTask" as const;

export const ValidatedTask = z.object({
  kind: z.literal(VALIDATED_TASK),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number(),
  isDone: z.boolean()
});
export type ValidatedTask = z.infer<typeof ValidatedTask>;

export const CreatedTask = z.object({
  kind: z.literal(CREATED_TASK),
  id: TaskId,
  name: z.string(),
  dueDate: z.date(),
  postPoneCount: z.number(),
  isDone: z.boolean()
});
export type CreatedTask = z.infer<typeof CreatedTask>;

/**
 * リポジトリ
 */
export type PostTaskRepository = (input: ValidatedTask) => Promise<CreatedTask>;

/**
 * ワークフロー
 */
export type PostTaskWorkflow = (input: ValidatedTask) => Promise<CreatedTask>;
import { z } from "zod";
import { TaskId } from "../common/publicTypes";
import { VALIDATED_TASK, ValidatedTask } from "../postTask/publicTypes";

export const ValidatedTaskSchema = z.object({
    id: TaskId,
    name: z.string(),
    dueDate: z.date(),
    postPoneCount: z.number(),
    isDone: z.boolean()
}).brand(VALIDATED_TASK);

/**
 * リポジトリ
 */
export type CompleteTaskRepository = (input: ValidatedTask) => Promise<CompletedTask>;

/**
 * ワークフロー
 */
export type CompleteTaskWorkflow = (taskId: TaskId) => Promise<CompletedTask>;
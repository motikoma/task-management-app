import { TaskDto, TaskId } from "../common/publicTypes";

/**
 * ワークフロー
 */
export type GetTaskWorkflow = (taskId: TaskId) => Promise<TaskDto>;
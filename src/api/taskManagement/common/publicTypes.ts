import { z } from "zod";

/**
 * ドメインオブジェクト
 */
export const TaskId = z.string().uuid().brand("TaskId");
export type TaskId = z.infer<typeof TaskId>;

/**
 * DTO
 */
export type TaskDto = {
    id: string;
    isDone: boolean;
    name: string;
    dueDate: Date;
    postPoneCount: number;
  }
import { z } from "zod";

/**
 * ドメインオブジェクト
 */
export const TaskId = z.string().uuid().brand("TaskId");
export type TaskId = z.infer<typeof TaskId>;

// MEMO: PostとUpdateで共通の集約を使用する？

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

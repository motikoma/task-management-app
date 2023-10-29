import {
  DONE_TASK,
  POSTPONABLE_UNDONE_TASK,
  Task,
  TaskId,
  UNDONE_TASK_WITH_DEADLINE,
} from "../../domain/task/task";

export type TaskDto = {
  id: string;
  name: string;
  dueDate: Date;
  postPoneCount: number;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const toDomain = (task: TaskDto): Task => {
  if (task.isDone === false) {
    if (task.postPoneCount <= 2) {
      return {
        kind: POSTPONABLE_UNDONE_TASK,
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
      };
    } else {
      return {
        kind: UNDONE_TASK_WITH_DEADLINE,
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
      };
    }
  } else {
    return {
      kind: DONE_TASK,
      id: TaskId.parse(task.id),
      name: task.name,
      dueDate: task.dueDate,
    };
  }
};

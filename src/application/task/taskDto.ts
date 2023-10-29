import { DoneTask, TaskId, UnDoneTask } from "../../domain/task/task";

export type TaskDto = {
  id: string;
  name: string;
  dueDate: Date;
  postPoneCount: number;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const toDomain = (task: TaskDto): UnDoneTask | DoneTask => {
  if (task.isDone === false) {
    if (task.postPoneCount >= 3) {
      return {
        kind: "UndoneTaskWithDeadline",
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
      };
    } else {
      return {
        kind: "PostPonableUnDoneTask",
        id: TaskId.parse(task.id),
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
      };
    }
  } else {
    return {
      kind: "DoneTask",
      id: TaskId.parse(task.id),
      name: task.name,
      dueDate: task.dueDate,
    };
  }
};

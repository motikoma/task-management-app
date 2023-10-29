import {
  CompleteTaskRepository,
  DONE_TASK,
  Task,
  TaskId,
  UNDONE_TASK,
  complete,
} from "../../domain/task/task";
import {
  FetchTaskQuery,
  fetchTaskQuery,
} from "../../infra/task/query/fetchTaskQuery";

import { TaskDto, toDomain } from "./taskDto";

export const completeTaskUseCase =
  (
    fetchTaskQuery: FetchTaskQuery,
    completeTaskRepository: CompleteTaskRepository
  ) =>
  async (taskId: TaskId) => {
    try {
      const taskDto: TaskDto = await fetchTaskQuery(taskId);
      const task = toDomain(taskDto);
      if (task.kind === DONE_TASK) return taskDto;

      const result = await completeTaskRepository(complete(task));
      return await fetchTaskQuery(result.id);
    } catch (error: any) {
      throw new Error(error);
    }
  };

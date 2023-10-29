import { TaskId } from "../../domain/task/task";
import { FetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";

export const getTaskUseCase =
  (fetchTaskQuery: FetchTaskQuery) => async (taskId: TaskId) => {
    return await fetchTaskQuery(taskId);
  };

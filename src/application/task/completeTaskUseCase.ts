import {
  CompleteTaskRepository,
  TaskId,
  complete,
} from "../../domain/task/task";
import { FetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";

import { toDomain } from "./taskDto";

export const completeTaskUseCase =
  (
    fetchTaskQuery: FetchTaskQuery,
    completeTaskRepository: CompleteTaskRepository
  ) =>
  async (taskId: TaskId) => {
    try {
      // taskIdからtaskを取得
      const task = await fetchTaskQuery(taskId);

      // この分岐処理はUndoneTaskをDoneにする処理には本来不要
      const domainObject = toDomain(task);
      if (domainObject.kind === "UnDoneTaskWithDeadline") {
        const result = await completeTaskRepository(complete(domainObject));

        return await fetchTaskQuery(result.id);
      } else if (domainObject.kind === "PostPonableUnDoneTask") {
        const result = await completeTaskRepository(complete(domainObject));

        return await fetchTaskQuery(result.id);
      } else {
        return task;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

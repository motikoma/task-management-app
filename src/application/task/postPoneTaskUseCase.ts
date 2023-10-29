import {
  PostPonableUnDoneTask,
  PostPoneTaskRepository,
  TaskId,
  postpone,
} from "../../domain/task/task";
import { FetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";

export const postPoneTaskUseCase =
  (
    fetchTaskQuery: FetchTaskQuery,
    postPoneTaskRepository: PostPoneTaskRepository
  ) =>
  async (taskId: TaskId) => {
    const task = await fetchTaskQuery(taskId);

    if (task.isDone) {
      throw new Error("task is already done");
    }

    // postPoneCountが3以上の場合はエラーになる
    const postPonableUnDoneTask = PostPonableUnDoneTask.parse({
      kind: "PostPonableUnDoneTask",
      id: TaskId.parse(task.id),
      name: task.name,
      dueDate: task.dueDate,
      postPoneCount: task.postPoneCount,
    });

    const result = await postPoneTaskRepository(
      postpone(postPonableUnDoneTask)
    );

    return await fetchTaskQuery(result.id);
  };

import {
  POSTPONABLE_UNDONE_TASK,
  PostPonableUnDoneTask,
  PostPoneTaskRepository,
  TaskId,
  postpone,
} from "../../domain/task/task";
import { FetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";
import { TaskDto } from "./taskDto";

export const postPoneTaskUseCase =
  (
    fetchTaskQuery: FetchTaskQuery,
    postPoneTaskRepository: PostPoneTaskRepository
  ) =>
  async (taskId: TaskId) => {
    const taskDto: TaskDto = await fetchTaskQuery(taskId);

    if (taskDto.isDone) {
      throw new Error("task is already done");
    }

    const task = {
      kind: POSTPONABLE_UNDONE_TASK,
      id: TaskId.parse(taskDto.id),
      name: taskDto.name,
      dueDate: taskDto.dueDate,
      postPoneCount: taskDto.postPoneCount,
    } satisfies PostPonableUnDoneTask;

    const postPonableUnDoneTask = PostPonableUnDoneTask.parse(task);

    const result = await postPoneTaskRepository(
      postpone(postPonableUnDoneTask)
    );

    return await fetchTaskQuery(result.id);
  };

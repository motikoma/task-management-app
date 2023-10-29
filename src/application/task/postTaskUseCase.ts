import {
  PostPonableUnDoneTask,
  PostTaskRepository,
} from "../../domain/task/task";
import { FetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";
import { Command } from "../../presentation/task/postTaskController";

export const postTaskUseCase =
  (fetchTaskQuery: FetchTaskQuery, postTaskRepository: PostTaskRepository) =>
  async (command: Command) => {
    try {
      const postPonableUnDoneTask = PostPonableUnDoneTask.parse({
        kind: "PostPonableUnDoneTask",
        id: command.id,
        name: command.name,
        dueDate: command.dueDate,
        postPoneCount: command.postPoneCount,
      });

      const result = await postTaskRepository(postPonableUnDoneTask);

      return await fetchTaskQuery(result.id);
    } catch (error: any) {
      throw new Error(error);
    }
  };

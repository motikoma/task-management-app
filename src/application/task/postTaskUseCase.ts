import {
  Command,
  POSTPONABLE_UNDONE_TASK,
  PostPonableUnDoneTask,
  PostTaskRepository,
  post,
} from "../../domain/task/task";
import { FetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";

export const postTaskUseCase =
  (fetchTaskQuery: FetchTaskQuery, postTaskRepository: PostTaskRepository) =>
  async (command: Command) => {
    try {
      const result = await postTaskRepository(post(command));

      return await fetchTaskQuery(result.id);
    } catch (error: any) {
      throw new Error(error);
    }
  };

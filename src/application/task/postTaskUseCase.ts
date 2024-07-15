import {
  Command,
  PostTaskRepository,
  post,
} from "../../domain/task/task";
import { FetchTaskQuery } from "../../infra/task/query/fetchTaskQuery";

export const postTaskUseCase =
  (fetchTaskQuery: FetchTaskQuery, postTaskRepository: PostTaskRepository) =>
  async (command: Command) => {
      const result = await postTaskRepository(post(command));
      return await fetchTaskQuery(result.id);
  };

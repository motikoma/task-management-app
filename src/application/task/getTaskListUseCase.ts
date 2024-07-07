import { Task } from "@prisma/client";
import { ResultAsync } from "neverthrow";
import { FetchTaskListQuery } from "../../infra/task/query/fetchTaskListQuery";

export const getTaskListUseCase =
  (fetchTaskListQuery: FetchTaskListQuery) =>
  (): ResultAsync<Task[], Error> => {
    return fetchTaskListQuery();
  };

import { FetchTaskListQuery } from "../../infra/task/query/fetchTaskListQuery";

export const getTaskListUseCase =
  (fetchTaskListQuery: FetchTaskListQuery) => async () => {
    return await fetchTaskListQuery();
  };

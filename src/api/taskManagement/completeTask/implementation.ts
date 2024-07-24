import { CompleteTaskRepository } from "../../../domain/task/task";
import { FetchTaskQuery } from "../getTask/fetchTaskQuery";
import { CompleteTaskWorkflow } from "./publicTypes";

export const completeTaskWorkflow: CompleteTaskWorkflow = (
    fetchTaskQuery: FetchTaskQuery,
    completeTaskRepository: CompleteTaskRepository
) => async (taskId) => {
    const task = await fetchTaskQuery(taskId);

    // parseする

    // 完了する

    // 完了したtaskを返す
}
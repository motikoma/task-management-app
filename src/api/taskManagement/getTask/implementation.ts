import { FetchTaskQuery } from "./fetchTaskQuery";
import { GetTaskWorkflow } from "./publicTypes";

export const getTaskWorkflow = (fetchTaskQuery: FetchTaskQuery): GetTaskWorkflow => 
async (taskId) => {
    return await fetchTaskQuery(taskId);
};
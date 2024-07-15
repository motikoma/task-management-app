import { ValidatedTask, PostTaskWorkflow, PostTaskRepository } from "./publicTypes";

export const postTaskWorkflow = (postTaskRepository: PostTaskRepository): PostTaskWorkflow => 
async (input: ValidatedTask) => {
    return await postTaskRepository(input);
};
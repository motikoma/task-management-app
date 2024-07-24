import { TaskId } from "../common/publicTypes";
import { GetTaskWorkflow } from "../getTask/publicTypes";
import { PostponeTaskRepository, PostponeTaskWorkflow, VALIDATED_TASK, ValidatedTaskSchema, ValidatedTaskInput } from "./publicTypes";

// ワークフローから別のワークフローを呼び出すのはあり？
export const postponeTaskWorkflow = (getTaskWorkflow: GetTaskWorkflow, postponeTaskRepository: PostponeTaskRepository): PostponeTaskWorkflow => 
async (command: TaskId) => {
    const task = await getTaskWorkflow(command);

    const unValidatedTask: ValidatedTaskInput = {
        // TODO: task.idはTaskId型にparseされる？
        id: task.id,
        name: task.name,
        dueDate: task.dueDate,
        postPoneCount: task.postPoneCount,
        isDone: task.isDone,
    }
    const validatedTask = ValidatedTaskSchema.parse(unValidatedTask);

    return await postponeTaskRepository(validatedTask);
};
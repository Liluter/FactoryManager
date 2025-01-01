export interface BrnachDataModel {
  branchTitle: string,
  notifications: number,
  tasks?: {
    activeTasks: { name: string, content: { description: string, files: string }, taskId: string, createdAt: string }[] | null,
    pastTasks: { name: string, content: { description: string, files: string }, taskId: string, createdAt: string }[] | null,
    activeTasksLength: number,
    pastTasksLength: number
  },
  messeges: { author: string, message: string, createdAt: string }[]

}
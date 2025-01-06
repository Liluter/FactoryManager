export interface BranchDataModel {
  branchTitle: string,
  notifications: number,
  lastnotification: number,
  tasks?: {
    activeTasks: { name: string, content: { description: string, files: string }, taskId: string, createdAt: string }[] | null,
    pastTasks: { name: string, content: { description: string, files: string }, taskId: string, createdAt: string }[] | null,
    activeTasksLength: number,
    pastTasksLength: number
  },
  workers: { name: string, uid: string, workingDay: number, hoursWorked: number, avatarID: string }[] | null
  messages: {
    unread: Message[],
    read: Message[]
  }

}
export interface Message {
  author: string,
  message: string,
  createdAt: string,
  read: boolean,
  id: string
}
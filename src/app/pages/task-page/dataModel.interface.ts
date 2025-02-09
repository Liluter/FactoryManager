export interface TaskDetailsModel {
  id?: string
  name: string
  description: string
  files?: string[]
  active: boolean
  timestamp: any
  started?: string
  priority: 0 | 1 | 2 | 3
  contractors: string[]
  department: string
  steps: [string, boolean][]
}
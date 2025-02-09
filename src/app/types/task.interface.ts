export interface Task {
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
  steps: { [key: string]: boolean }
}
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
export interface Contractor {
  id: string,
  name: string
}
export interface TaskWithContractorNames extends Task {
  contractorNames: string[]
}
export interface message {
  severity: Severity,
  summary: string, 
  detail: string
}

export enum Severity {
    SUCCESS = 'success',
    INFO = 'info', 
    WARN = 'warn',
    ERROR = 'error'
  }
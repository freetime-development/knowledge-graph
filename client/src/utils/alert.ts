import { TranslationKey } from '../stores/translationStore'

export enum Severity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success'
}

export interface AlertMessage {
  message: TranslationKey // 1i8n key
  severity: Severity
  params?: object // 1i8n params
}

export function dispatchAlert (message: AlertMessage, persistent: boolean = false) {
  const event = new CustomEvent('alert', { detail: { ...message, persistent } })
  window.dispatchEvent(event)
}

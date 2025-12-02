import { vi } from './vi'
import { en } from './en'

export const locales = {
  vi,
  en,
}

export type Locale = keyof typeof locales
export type TranslationKeys = typeof vi

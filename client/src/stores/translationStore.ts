import i18n from 'i18n-js'
import TranslationService from '../services/translationService'
import { en } from '../translations/en'
import { errorHandler } from '../utils/decorators'

export type TranslationKey = keyof (typeof en)

const LANGUAGE_LOCALES = {
  'en-US': 'en'
}

export default class TranslationStore {
  service: TranslationService
  i18n: typeof i18n

  constructor (service: TranslationService) {
    this.service = service
    this.i18n = i18n
    this.i18n.defaultLocale = 'en'
    this.i18n.fallbacks = true
    this.i18n.translations = { en }
  }

  // setupBackendTranslations = new Proxy(
  //   async (language: string): Promise<void> => {
  //     const locale = LANGUAGE_LOCALES[language]
  //     if (locale) {
  //       this.i18n.locale = locale
  //       const translations = await this.service.getTranslations(language)
  //       console.log(translations)
  //       i18n.translations[locale] = {
  //         ...translations,
  //         ...i18n.translations[locale]
  //       }
  //     }
  //   }, {
  //     apply: async function(target, thisArg, argumentList) {
  //       console.log(target, thisArg, argumentList)

  //       try {
  //         const result = await target.apply(thisArg, argumentList)
  //         return result
  //       } catch(error) {
  //         console.log(error)
  //       }
  //     }
  //   }
  // )

  setupBackendTranslations = async (language: string): Promise<void> => {
    const locale = LANGUAGE_LOCALES[language]
    if (locale) {
      this.i18n.locale = locale
      const translations = await this.service.getTranslations(language)
      console.log("NEVER!!!!")
      i18n.translations[locale] = {
        ...translations,
        ...i18n.translations[locale]
      }
    }
  }

  msg (key: TranslationKey, vars: object = {}): string {
    return key ? i18n.t(key, { ...vars }) : null
  }
}



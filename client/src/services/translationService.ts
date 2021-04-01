import axios, { AxiosInstance } from 'axios'
import { defaultApiConfig, ApiRoutes } from '../conf'
import TranslationStore from "../stores/translationStore"

interface Config {

}

interface TranslationData {

}

class TranslationService {
  api: AxiosInstance
  // store: TranslationStore
  source

  constructor(config: Config = defaultApiConfig) {
    this.api = axios.create(config)
    this.source = axios.CancelToken.source()
    // this.store = translationStore
  }

  async getTranslations (language = 'en-US'): Promise<TranslationData> {
    try {
      const response = await this.api.get<TranslationData>(
        `${ApiRoutes.TRANSLATIONS}/translate?locale=${language}`,
        {
          cancelToken: this.source.token
        }
      )

      return response.data
    } catch(err) {
      throw new Error("BOOM")
    }
  }

  abort = () => {
    this.source.cancel()
  }


}

export default TranslationService

import { ChatRequestData } from '../@types/queries'

export const chatRequset = async (sessionClient: any, data: ChatRequestData) => {
  const { text, languageCode, sessionPath } = data
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode,
      },
    },
  }
  const responses = await sessionClient.detectIntent(request)
  return responses
}

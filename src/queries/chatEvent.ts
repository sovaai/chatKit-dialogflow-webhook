import { ChatEventData } from '../@types/queries'

export const chatEvent = async (sessionClient: any, data: ChatEventData) => {
  const { eventName, sessionPath, languageCode } = data
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: eventName,
        languageCode,
      },
    },
  }
  const responses = await sessionClient.detectIntent(request)
  return responses
}

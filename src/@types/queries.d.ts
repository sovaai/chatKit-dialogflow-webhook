export interface ChatRequestData {
    sessionPath: string
    text: string
    languageCode: string
}
export interface ChatEventData {
    sessionPath: string
    eventName: string
    languageCode: string
}
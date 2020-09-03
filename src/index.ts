import * as express from 'express'
const dialogflow = require('dialogflow')
import { chatRequset } from './queries/chatRequset'
import { chatEvent } from './queries/chatEvent'
const { Router } = express
const ckDialogflowWebhook = (keyFilename: string) => {
  const sessionClient = new dialogflow.v2.SessionsClient({ keyFilename })
  const router = Router()
  router.post('/ckWebhook/dialogFLow/chatInit', (req, res) => {
    const { sessionId, projectId } = req.body.data
    try {
      const sessionPath = sessionClient.sessionPath(projectId, sessionId)

      const result = {
        sessionPath,
      }
      res.json({ result })
    } catch (err) {
      console.log(err)
    }
  })
  router.post('/ckWebhook/dialogFLow/chatRequest', async (req, res) => {
    try {
    const { data } = req.body
    const result = await chatRequset(sessionClient, data)
    res.json({ result })
    } catch(err){
      console.log(err)
    }
  })
  router.post('/ckWebhook/dialogFLow/chatEvent', async (req, res) => {
    try{
    const { data } = req.body
    const result = await chatEvent(sessionClient, data)
    res.json({ result })
    } catch(err){
      console.log(err)
    }
  })
  return router
}
export default ckDialogflowWebhook

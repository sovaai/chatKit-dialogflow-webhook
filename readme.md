**Dialogflow webhook** –  mechanism for alerting you to system events through callbacks.  
You can use this webhook with [CK Dialogflow module](https://github.com/sovaai/chatKit-dialogflow-module "read about this module").



# Usage
```javascript
import * as express from 'express'

import ckDialogflowWebhook from 'ck-webhook-dialogflow'
const configPath = <Path to your private key file> 
const dialogflow = ckDialogflowWebhook(configPath)

const app = express()

app.use(dialogflow)
```

You need to set up authentication. The client application that uses the API must be authenticated and granted access to the requested resources. You need create a service account and download the private key file (token). Instruction about this you can reed [here](https://cloud.google.com/dialogflow/es/docs/quick/setup?authuser=1) (title "Set up authentication")



## Routes
### /ckWebhook/dialogFLow/chatInit
```javascript
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
```

### /ckWebhook/dialogFLow/chatRequest
```javascript
  router.post('/ckWebhook/dialogFLow/chatRequest', async (req, res) => {
    try {
    const { data } = req.body
    const result = await chatRequset(sessionClient, data)
    res.json({ result })
    } catch(err){
      console.log(err)
    }
  })
```

### /ckWebhook/dialogFLow/chatEvent
```javascript
  router.post('/ckWebhook/dialogFLow/chatEvent', async (req, res) => {
    try{
    const { data } = req.body
    const result = await chatEvent(sessionClient, data)
    res.json({ result })
    } catch(err){
      console.log(err)
    }
  })
```

const ip = require('ip')
const axios = require('axios')
const express = require('express')

const app = express()
const port = 33246

app.get('/probe', async (req, res) => {
  const targetServer = req.query.target_server

  // Check if target_server parameter is provided
  if (!targetServer) {
    return res.status(400).json({ error: 'Target server not provided.' })
  }

  try {
    const startTime = new Date()

    // Make request to target server
    const response = await axios.get(targetServer)

    const endTime = new Date()
    const responseTime = endTime - startTime

    res.json({
      status_code: response.status,
      response_time: responseTime
    })
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
  console.log(`Server listening at http://${ip.address()}:${port}`)
})

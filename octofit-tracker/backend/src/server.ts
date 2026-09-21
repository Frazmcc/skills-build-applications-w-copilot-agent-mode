import express from 'express'
import './config/database'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import teamsRouter from './routes/teams'
import usersRouter from './routes/users'
import workoutsRouter from './routes/workouts'

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173'

app.use(express.json())
app.use((request, response, next) => {
  const origin = request.get('origin')
  const isAllowedOrigin = origin === frontendOrigin

  if (isAllowedOrigin) {
    response.header('Access-Control-Allow-Origin', origin)
    response.header('Vary', 'Origin')

    response.header('Access-Control-Allow-Headers', 'Content-Type')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')

    if (request.method === 'OPTIONS') {
      response.sendStatus(204)
      return
    }
  }

  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: error instanceof Error ? error.message : 'Request failed' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`)
})
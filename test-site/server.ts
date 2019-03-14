// import { createServer } from 'http'
// import { parse } from 'url'
import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'

const port = parseInt(process.env.PORT || '4100', 10) || 4100
const dev = process.env.NODE_ENV !== 'production'

import { json, urlencoded } from 'body-parser'

const app: express.Express = express()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('/index.js', (req, res) =>
  res.sendFile(path.join(__dirname, 'index.js'))
)

app.listen(port, err => {
  if (err) throw err

  setTerminalTitle(`${port}:Test-Site`)
  console.log(`Listening on port ${port}!`)
})

function setTerminalTitle(title) {
  process.title = title
  process.stdout.write(
    String.fromCharCode(27) + ']0;' + title + String.fromCharCode(7)
  )
}

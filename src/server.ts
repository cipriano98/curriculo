import server from './app'

require('dotenv').config()

const port = process.env.PORT || 3333

server.listen(port, () => {
    console.clear()
    console.log(`\nApp inicializado em http://localhost:${port}\n`)
})

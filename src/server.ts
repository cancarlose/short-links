import fastify from 'fastify'
import { z } from 'zod' // ferramenta para validar dados

const app = fastify()

app.post('/links', (request) => {


  return "Hello World!"
})

app.listen ({
  port: 3333,
}).then(() => {
  console.log("HTTP server running")
})
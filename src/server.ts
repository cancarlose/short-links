import fastify from 'fastify'
import { z } from 'zod'; // ferramenta para validar dados

const app = fastify()

app.post('/links', (request) => {
  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  })

  const { code, url } = createLinkSchema.parse(request.body)

  return "Hello World!"
})

app.listen ({
  port: 3333,
}).then(() => {
  console.log("HTTP server running")
})
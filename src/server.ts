import fastify from 'fastify'
import { z } from 'zod'; // ferramenta para validar dados
import { sql } from './lib/postgres';

const app = fastify()

app.post('/links', async(request, reply) => {
  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  })

  const { code, url } = createLinkSchema.parse(request.body) // Parse: conversão de strings em instâncias de tipos de dados nativos

  const result = await sql/*sql*/`
  INSERT INTO shorts_links (code, original_url)
  VALUES (${code}, ${url})
  RETURNING id
  `

  const link = result[0]

  // 200 - sucesso, generico
  // 201 - registro criado com sucesso

  return reply.status(201).send({ shortLinkId: link.id }) // Reply: para mudar dados da resposta, return
})

app.listen ({
  port: 3333,
}).then(() => {
  console.log("HTTP server running")
})
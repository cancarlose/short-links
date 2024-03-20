import fastify from 'fastify'
import { z } from 'zod'; // ferramenta para validar dados
import { sql } from './lib/postgres';
import postgres from 'postgres';

const app = fastify()

app.get('/links', async () => {
  const result = await sql/*sql*/`
    SELECT *
    FROM shorts_links
    ORDER BY created_at DESC
  `

  return result
})

app.post('/links', async(request, reply) => {
  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  })

  const { code, url } = createLinkSchema.parse(request.body) // Parse: conversão de strings em instâncias de tipos de dados nativos

  try {
    const result = await sql/*sql*/`
  INSERT INTO shorts_links (code, original_url)
  VALUES (${code}, ${url})
  RETURNING id
  `

  const link = result[0]

  // 200 - sucesso, generico
  // 201 - registro criado com sucesso

  return reply.status(201).send({ shortLinkId: link.id }) // Reply: para mudar dados da resposta, return
  } catch (err) {
    if (err instanceof postgres.PostgresError) {
      if (err.code === '23505') {
        return reply.status(400).send({message: 'Duplicated code!'})
      }
    }

    console.log(err)

    return reply.status(500).send({message: 'Internal server error.'})

  }
})

app.listen ({
  port: 3333,
}).then(() => {
  console.log("HTTP server running")
})
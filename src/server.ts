import fastify from 'fastify';
import postgres from 'postgres';
import { z } from 'zod'; // ferramenta para validar dados
import { sql } from './lib/postgres';
import { redis } from './lib/redis';

const app = fastify()

// Rota de encaminhamento
app.get('/:code', async (request, reply) => {
  const getLinkSchema = z.object({
    code: z.string().min(3),
  })

  const { code } = getLinkSchema.parse(request.params)

  const result = await sql/*sql*/`
    SELECT id, original_url
    FROM shorts_links
    WHERE shorts_links.code = ${code}
  `

  if(result.length === 0) {
    return reply.status(400).send( { message: "Link not found." })
  }

  const link = result[0]

  await redis.zIncrBy('metrics', 1, String(link.id))
  // Faz-se necessário ferramenta de auxilio para melhor visualização do Redis.

  // 301 - permanente
  // 302 - temporário
  return reply.redirect(301, link.original_url)
})

// Rota de listagem
app.get('/api/links', async () => {
  const result = await sql/*sql*/`
    SELECT *
    FROM shorts_links
    ORDER BY created_at DESC
  `

  return result
})

// Rota de criação
app.post('/api/links', async(request, reply) => {
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

app.get('/api/metric', async () => {
  const result = await redis.zRangeByScoreWithScores('metrics', 0, 50)

  const metrics = result
  .sort((a, b) => b.score - a.score)
  .map(item => {
    return {
      shortLinkId: Number(item.value),
      clicks: item.score
    }
  })

  return result
})

app.listen ({
  port: 3333,
}).then(() => {
  console.log("HTTP server running")
})
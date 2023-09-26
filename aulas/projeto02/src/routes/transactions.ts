import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const data = await knex('transactions').select('*')

    return {
      data,
    }
  })

  app.get('/:id', async (request) => {
    const getTransactionByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionByIdParamsSchema.parse(request.params)

    const data = await knex('transactions')
      .select('*')
      .where({
        id,
      })
      .first()

    return {
      data,
    }
  })

  app.get('/summary', async () => {
    const data = await knex('transactions').sum('amount as total').first()

    return {
      data,
    }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
      session_id: z.string().default(randomUUID()),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: randomUUID(),
    })

    return reply.status(201).send()
  })
}

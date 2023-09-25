import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'crypto'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes, {
  prefix: '/transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })

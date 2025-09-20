import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { rateLimiter } from 'hono-rate-limiter'
import { prettyJSON } from 'hono/pretty-json'

import { corsConfig } from './config/cors.config'
import { rateLimiterConfig } from './config/rateLimiter.config'

import user from './routers/user.router'

const app = new Hono()

app.use(corsConfig);
app.use('*', rateLimiterConfig);
app.use(prettyJSON())
app.use(logger())
app.get('/api/test', (c) => c.text('Hello SIT Time Table Backend'))
app.route('/api/user', user)

export default {
  port: 3001,
  fetch: app.fetch,
} 
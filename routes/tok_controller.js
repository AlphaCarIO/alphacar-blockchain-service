const router = require('koa-router')()

import * as tok_service from "../services/tok_service"

router.get('/api/tok/ticker/:symbol', async (ctx, next) => {
  ctx.response.type = 'json';
  await tok_service.getPrice(ctx)
})

module.exports = router

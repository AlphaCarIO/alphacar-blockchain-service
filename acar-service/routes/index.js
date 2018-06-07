const router = require('koa-router')()

import * as web3_service from "../services/web3_service"

router.get('/', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.response.body = { 'msg': 'demo test' };
})

router.get('/token/balanceOf/:address', async (ctx, next) => {
  ctx.response.type = 'json';
  var address = ctx.params.address;
  console.log('address:', address)
  let balance = await web3_service.balanceOf(address)
  ctx.response.body = { 'balance': balance };
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

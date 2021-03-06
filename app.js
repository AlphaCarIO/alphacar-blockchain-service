const Koa = require('koa')
const app = new Koa()
var cors = require('koa2-cors');

import * as swagger from 'swagger2';
import {ui, router as swaggerRouter, Router} from 'swagger2-koa';
import { validate } from 'swagger2-koa';

const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index_c = require('./routes/index_controller')
const web_c = require('./routes/web3_controller')
const mongo_c = require('./routes/mongo_controller')
const gate_c = require('./routes/gate_controller')
const tok_c = require('./routes/tok_controller')

// error handler
onerror(app)

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index_c.routes(), index_c.allowedMethods())
app.use(web_c.routes(), web_c.allowedMethods())
app.use(mongo_c.routes(), mongo_c.allowedMethods())
app.use(gate_c.routes(), gate_c.allowedMethods())
app.use(tok_c.routes(), tok_c.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

let swagger_path = './swagger/swagger.yaml'
const document = swagger.loadDocumentSync(swagger_path);

if (!swagger.validateDocument(document)) {
  throw Error(swagger_path + ` does not conform to the Swagger 2.0 schema`);
}

app.use(ui(document, '/api_docs'));
app.use(validate(document));

module.exports = app

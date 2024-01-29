const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/health', (ctx, next) => {
    ctx.body = 'ok';
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app.listen(3000);
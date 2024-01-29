const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

const getRandomDirection = () => {
    const probabilities = [70, 10, 10, 10]; // NORTH has a 70% chance, others 10% each
    const rand = Math.random() * 100;
    let cumulativeProb = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProb += probabilities[i];
      if (rand < cumulativeProb) {
        return ['NORTH', 'EAST', 'SOUTH', 'WEST'][i];
      }
    }

    // Default to 'NORTH' if for some reason probabilities don't add up to 100
    return 'NORTH';
};

router.get('/health', (ctx, next) => {
    ctx.body = 'ok';
});
router.get('/robot/start', (ctx) => {
    // ctx.body = 'robot start';
   
    const coordinates={
        x: Math.floor(Math.random() * 16),
        y: Math.floor(Math.random() * 11) * 3 - 15,
        direction: getRandomDirection(),
    }
    ctx.body = coordinates;
    ctx.type = 'application/json'; 
});
router.get('/robot/end/:difficulty', (ctx) => {

    const difficulty = parseInt(ctx.params.difficulty);

    if ( difficulty < 1 || difficulty > 4) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid difficulty parameter. Difficulty must be between 1 and 4.' };
        return;
    }
    
    let coordinates;
    switch(difficulty){
        case 1:
            coordinates = {x: 1, y: 1};
            break;
        case 2:
            coordinates = {x: 4, y: 4};
            break;
        case 3:
            coordinates = {x: 9, y: 9};
            break;
        case 4:
            coordinates = {x: 16, y: 16};
            break;
    }
    ctx.body = coordinates;
    ctx.type = 'application/json';

    
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app.listen(3000);
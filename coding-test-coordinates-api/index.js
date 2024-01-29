const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

//to fetch endpoint
const fetchCoordinates = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch coordinates. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

//**Fetch Start and End Coordinates**
async function main() {
  try {
    const startCoordinates = await fetchCoordinates(
      "http://localhost:3000/robot/start"
    );
    const endCoordinates = await fetchCoordinates(
      "http://localhost:3000/robot/end/3"
    );

    console.log("Start Coordinates:", startCoordinates);
    console.log("End Coordinates:", endCoordinates);
    const shortestdistance = findShortestRoute(startCoordinates,endCoordinates);
    console.log(shortestdistance);
    // **Display the Route**
    let output = {'start':startCoordinates, 'end':endCoordinates,'route':shortestdistance};
    return output;
    } catch (error) {
    console.error("Main function error:", error.message);
  }
}

//**Calculate Shortest Route**
function findShortestRoute(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const moveRight = dx > 0 ? 'R' : 'L';
    const moveUp = dy > 0 ? 'A' : '';
    const moveDown = dy > 0 ? '' : 'A';
    const horizontalMoves = Array(Math.abs(dx)).fill(moveRight).join('');
    const verticalMoves = Array(Math.abs(dy)).fill(moveUp).join('');
    return verticalMoves + horizontalMoves + moveDown;
}

//RandomDirection
const getRandomDirection = () => {
  const probabilities = [70, 10, 10, 10]; 
  const rand = Math.random() * 100;
  let cumulativeProb = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProb += probabilities[i];
    if (rand < cumulativeProb) {
      return ["NORTH", "EAST", "SOUTH", "WEST"][i];
    }
  }
  return "NORTH";
};

//Routes
router.get("/health", (ctx) => {
  ctx.body = "ok";
});
router.get("/robot/start", (ctx) => {
  const coordinates = {
    //   #### Endpoint 1:
    x: Math.floor(Math.random() * 16),
    y: Math.floor(Math.random() * 11) * 3 - 15,
    direction: getRandomDirection(),
  };
  ctx.body = coordinates;
  ctx.type = "application/json";
});

// #### Endpoint 2:
router.get("/robot/end/:difficulty", (ctx) => {
  const difficulty = parseInt(ctx.params.difficulty);
  console.log(difficulty, "difficulty");
  if (isNaN(difficulty) || difficulty < 1 || difficulty > 4) {
    ctx.status = 400;
    ctx.body = {
      error:
        "Invalid difficulty parameter. Difficulty must be between 1 and 4.",
    };
    return;
  }
  
  let coordinates;
  switch (difficulty) {
    case 1:
    coordinates = { x: 1, y: 1 };
      break;
    case 2:
      coordinates = { x: 4, y: 4 };
      break;
    case 3:
      coordinates = { x: 9, y: 9 };
      break;
    case 4:
      coordinates = { x: 16, y: 16 };
      break;
  }
  ctx.body = coordinates;
  console.log(coordinates);
  ctx.type = "application/json";
});

router.get('/', async (ctx) => {
    try {
      const result = await main();
      ctx.body = result;
      ctx.type = "application/json";
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  });
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app.listen(3000);

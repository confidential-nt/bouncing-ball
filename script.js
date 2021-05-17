window.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "target";
  canvas.width = 1000;
  canvas.height = 600;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffec3d";

  const RADIAN = Math.PI / 180;
  const RADIUS = 40;

  const ballVector = {
    x: getRandomInt(RADIUS, canvas.width - RADIUS),
    y: getRandomInt(RADIUS, canvas.height - RADIUS),
  };

  const step = { x: 5, y: 5 };

  let current = null;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function draw() {
    ctx.beginPath();
    ctx.arc(ballVector.x, ballVector.y, RADIUS, 0, 360 * RADIAN);
    ctx.stroke();
    ctx.fill();
  }

  function update() {
    if (ballVector.x >= canvas.width - RADIUS || ballVector.x - RADIUS <= 0) {
      step.x *= -1;
    }
    if (ballVector.y >= canvas.height - RADIUS || ballVector.y - RADIUS <= 0) {
      step.y *= -1;
    }
    ballVector.x += step.x;
    ballVector.y += step.y;
  }

  function clean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function animate(timestamp) {
    window.requestAnimationFrame(animate);
    clean();
    draw();

    let start = timestamp;
    if (start - current < 15) return;
    update();
    current = null;
    if (!current) current = start;
  }

  window.requestAnimationFrame(animate);
};

// counter++ 할때 counter가 4가 되면 0이 되게 하는거를 counter%=4로도 할 수 있다.
// ex)
// counter++;
// counter%=4;

import React, { useState, useEffect, useRef } from "react";

const box = 20;
const canvasWidth = 500; // 1. Page size bada
const canvasHeight = 500;

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 9 * box, y: 10 * box }]);
  const [food, setFood] = useState({ x: Math.floor(Math.random() * 25) * box, y: Math.floor(Math.random() * 25) * box });
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200); // 2. speed manage

  // Arrow key input
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
    if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
    if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
  };

  const checkCollision = (head, array) => {
    for (let i = 0; i < array.length; i++) {
      if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
  };

  const draw = (ctx) => {
    // 3. fancy border
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.lineWidth = 5;
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.25, "orange");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(0.75, "green");
    gradient.addColorStop(1, "blue");
    ctx.strokeStyle = gradient;
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

    // Snake
    snake.forEach((s, idx) => {
      if (idx === 0) {
        // 4. head better design
        ctx.fillStyle = "lime";
        ctx.beginPath();
        ctx.arc(s.x + box / 2, s.y + box / 2, box / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "green";
        ctx.fillRect(s.x, s.y, box, box);
      }
      ctx.strokeStyle = "#000";
      ctx.strokeRect(s.x, s.y, box, box);
    });

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    draw(ctx);
  }, [snake, food]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === "LEFT") snakeX -= box;
      if (direction === "UP") snakeY -= box;
      if (direction === "RIGHT") snakeX += box;
      if (direction === "DOWN") snakeY += box;

      let newHead = { x: snakeX, y: snakeY };

      if (snakeX === food.x && snakeY === food.y) {
        setScore((prev) => prev + 1);
        setFood({ x: Math.floor(Math.random() * (canvasWidth / box)) * box, y: Math.floor(Math.random() * (canvasHeight / box)) * box });
        setSnake((prev) => [newHead, ...prev]); // snake grows
      } else {
        setSnake((prev) => [newHead, ...prev.slice(0, -1)]);
      }

      if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvasWidth ||
        snakeY >= canvasHeight ||
        checkCollision(newHead, snake)
      ) {
        alert("Game Over! Score: " + score);
        setIsRunning(false);
        setSnake([{ x: 9 * box, y: 10 * box }]);
        setDirection("RIGHT");
        setScore(0);
      }
    }, speed); // use speed state

    return () => clearInterval(interval);
  }, [snake, direction, isRunning, food, score, speed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Snake Game</h1>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: "2px solid black" }}></canvas>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setIsRunning(true)}>Play</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={() => setSpeed(300)}>Slow</button>
        <button onClick={() => setSpeed(150)}>Fast</button>
      </div>
      <h2>Score: {score}</h2>
    </div>
  );
};

export default SnakeGame;

import React, { useEffect, useRef, useState } from 'react';

export default function MousePaddleGame() {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 18,
      dx: 1.5,
      dy: 1.5,
      speed: 0.018
    };

    let paddle = {
      x: canvas.width / 2 - 130,
      y: canvas.height - 40,
      width: 260,
      height: 20
    };

    let animationId;

    function drawBall() {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff6b6b';
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.fillStyle = '#4dabf7';
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    function drawScore() {
      ctx.fillStyle = 'white';
      ctx.font = '18px Arial';
      ctx.fillText('Score: ' + score, 10, 24);
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      drawScore();

      ball.x += ball.dx * ball.speed * 60;
      ball.y += ball.dy * ball.speed * 60;

      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
      }
      if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
      }

      const grace = 4;
      if (
        ball.y + ball.radius >= paddle.y - grace &&
        ball.y + ball.radius <= paddle.y + paddle.height + grace &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
      ) {
        ball.dy = -Math.abs(ball.dy);
        setScore(prev => prev + 1);
      }

      if (ball.y - ball.radius > canvas.height) {
        cancelAnimationFrame(animationId);
        setGameRunning(false);
        return;
      }

      animationId = requestAnimationFrame(update);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      paddle.x = e.clientX - rect.left - paddle.width / 2;
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
    }

    if (gameRunning) {
      canvas.addEventListener('mousemove', handleMouseMove);
      update();
    }

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [gameRunning]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {!gameRunning && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', flexDirection: 'column', zIndex: 10, color: 'white'
        }}>
          <div style={{ fontSize: '2.2em', marginBottom: '16px' }}>Click to Start</div>
          <button style={{ padding: '12px 24px', fontSize: '1.1rem', borderRadius: '8px' }} onClick={() => { setScore(0); setGameRunning(true); }}>
            Play
          </button>
        </div>
      )}
      <canvas ref={canvasRef} width={900} height={600} style={{ background: '#222', border: '3px solid #555', borderRadius: '12px' }} />
    </div>
  );
}

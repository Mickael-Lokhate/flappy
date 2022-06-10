import Phaser from "phaser";
import { useEffect } from "react";
import BackgroundScene from "../phaser/flappy_scenes/background";
import FlappyScene from "../phaser/flappy_scenes/flappy";

const config = {
  width: 450,
  height: 800,
  type: Phaser.AUTO,
  parent: "flappy-game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [FlappyScene, BackgroundScene],
};

function Flappy() {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy();
      game.canvas.parentNode.removeChild(game.canvas);
    };
  });
  return (
    <div
      id="flappy-game"
      style={{ margin: "0 auto", width: "100%", textAlign: "center" }}
    >
      <h1>Flappy</h1>
    </div>
  );
}

export default Flappy;

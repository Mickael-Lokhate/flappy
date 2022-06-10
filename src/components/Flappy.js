import Phaser from "phaser";
import { useEffect } from "react";
import FlappyScene from "../phaser/flappy_scenes/flappy";

const config = {
  width: 600,
  height: 400,
  type: Phaser.AUTO,
  parent: "flappy-game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: FlappyScene,
};

function Flappy() {
  useEffect(() => {
    const game = new Phaser.Game(config);
  });
  return (
    <div id="flappy-game">
      <h1>Flappy</h1>
    </div>
  );
}

export default Flappy;

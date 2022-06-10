import Phaser from "phaser";
import { useEffect } from "react";
import GameOverScene from "../phaser/gameover";
import GameBackGround from "../phaser/game_background";
import PongScene from "../phaser/pong";
import TitleScreen from "../phaser/titlescreen";

const config = {
  width: 800,
  height: 500,
  type: Phaser.AUTO,
  parent: "pong-game",
  scene: [TitleScreen, PongScene, GameBackGround, GameOverScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

function Pong() {
  const game = new Phaser.Game(config);
  useEffect(() => {
    return () => {
      game.destroy();
      game.canvas.parentNode.removeChild(game.canvas);
    };
  });
  return (
    <div id="pong-game">
      <h1>Pong</h1>
    </div>
  );
}

export default Pong;

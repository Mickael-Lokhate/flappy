import Phaser from "phaser";
import { useEffect } from "react";
import PlatformScene from "../phaser/platform";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "platform",
  backgroundColor: 0xffffff,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: PlatformScene,
};

function Platform() {
  useEffect(() => {
    const game = new Phaser.Game(config);
    return () => {
      game.destroy();
      game.canvas.parentNode.removeChild(game.canvas);
    };
  }, []);
  return (
    <div id="platform">
      <h1>Platform Game</h1>
    </div>
  );
}

export default Platform;

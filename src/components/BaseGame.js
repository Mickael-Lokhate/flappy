import React, { useEffect } from "react";
import Phaser from "phaser";
import TestScene from "../phaser/test_scene";
import "./App.css";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "basic-game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: TestScene,
};

function BaseGame() {
  useEffect(() => {
    const game = new Phaser.Game(config);
    return () => {
      game.destroy();
      game.canvas.parentNode.removeChild(game.canvas);
    };
  }, []);
  return (
    <div id="basic-game">
      <h1>Basic Phaser Game</h1>
    </div>
  );
}

export default BaseGame;

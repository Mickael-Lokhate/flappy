import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

const GameState = {
  Running: "running",
  PlayerWon: "player-won",
  AIWon: "ai-won",
};

class PongScene extends Phaser.Scene {
  constructor() {
    super("pong_scene");
  }
  init() {
    this.leftScore = 0;
    this.rightScore = 0;
    this.pause = false;
    this.gameState = GameState.Running;
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);

    this.load.audio(
      "beep",
      process.env.PUBLIC_URL + "assets/pong/ping_pong_8bit_beeep.wav"
    );
    this.load.audio(
      "plop",
      process.env.PUBLIC_URL + "assets/pong/ping_pong_8bit_plop.wav"
    );
  }

  create() {
    this.scene.run("gameback");
    this.scene.sendToBack("gameback");
    this.physics.world.setBounds(-100, 0, 1000, 500);

    this.createBall();
    this.createScore();
    this.paddleLeft = this.createPaddle(40, 250);
    this.paddleRight = this.createPaddle(760, 250);

    this.physics.add.collider(
      this.ball,
      this.paddleLeft,
      this.handlePaddleBallCollide,
      undefined,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.paddleRight,
      this.handlePaddleBallCollide,
      undefined,
      this
    );

    this.physics.world.on("worldbounds", this.handleBallWorldCollisions, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.time.delayedCall(1500, () => {
      this.resetBall();
    });
  }

  update() {
    if (!this.ball || this.pause || this.gameState !== GameState.Running)
      return;
    this.keyboardHandle();
    this.aiHandle();
    this.scoreHandle();
  }

  handleBallWorldCollisions(body, up, down, left, right) {
    if (left || right) {
      return;
    }
    this.sound.play("plop");
  }

  handlePaddleBallCollide(paddle, ball) {
    this.sound.play("beep");
    const vel = this.ball.body.velocity;
    vel.x += 1.1;
    vel.y += 1.1;
    this.ball.body.setVelocity(vel.x, vel.y);
  }

  resetBall() {
    this.ball.setPosition(400, 250);
    let angle = Phaser.Math.Between(0, 360);
    if (angle === 90 || angle === 180) angle = Phaser.Math.Between(0, 360);
    const vec = this.physics.velocityFromAngle(angle, 300);
    this.ball.body.setVelocity(vec.x, vec.y);
  }

  createBall() {
    this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
    this.physics.add.existing(this.ball);
    this.ball.body.setCircle(10);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setMaxSpeed(600);
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.onWorldBounds = true;
  }

  createPaddle(x, y) {
    const paddle = this.add.rectangle(x, y, 25, 100, 0xffffff, 1);
    this.physics.add.existing(paddle, true);
    return paddle;
  }

  createScore() {
    const style = { fontSize: 48, fontFamily: '"Press Start 2P"' };
    this.leftScoreLabel = this.add
      .text(300, 125, `${this.leftScore}`, style)
      .setOrigin(0.5, 0.5);
    this.rightScoreLabel = this.add
      .text(500, 375, `${this.rightScore}`, style)
      .setOrigin(0.5, 0.5);
  }

  checkWin() {
    const maxScore = 3;
    if (this.leftScore >= maxScore) {
      this.physics.pause();
      this.gameState = GameState.PlayerWon;
    } else if (this.rightScore >= maxScore) {
      this.physics.pause();
      this.gameState = GameState.AIWon;
    }

    if (this.gameState === GameState.Running) this.resetBall();
    else {
      this.ball.active = false;
      this.physics.world.remove(this.ball.body);

      this.scene.stop("gameback");
      this.scene.start("gameover", {
        leftScore: this.leftScore,
        rightScore: this.rightScore,
      });
    }
  }

  scoreHandle() {
    const leftBound = -30;
    const rightBound = 830;
    if (this.ball.x >= leftBound && this.ball.x <= rightBound) return;

    if (this.ball.x < leftBound) {
      this.rightScore++;
      this.rightScoreLabel.setText(`${this.rightScore}`);
    } else if (this.ball.x > rightBound) {
      this.leftScore++;
      this.leftScoreLabel.setText(`${this.leftScore}`);
    }
    this.checkWin();
  }

  keyboardHandle() {
    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= 5;
      this.paddleLeft.body.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      this.paddleLeft.y += 5;
      this.paddleLeft.body.updateFromGameObject();
    }
  }

  aiHandle() {
    const diff = this.ball.y - this.paddleRight.y;
    const speed = 3;
    if (Math.abs(diff) < 10) return;
    if (diff < 0) {
      this.paddleRightVelocity.y = -speed;
      if (this.paddleRightVelocity.y < -10) this.paddleRightVelocity.y = -10;
    } else if (diff > 0) {
      this.paddleRightVelocity.y = speed;
      if (this.paddleRightVelocity.y > 10) this.paddleRightVelocity.y = 10;
    }
    this.paddleRight.y += this.paddleRightVelocity.y;
    this.paddleRight.body.updateFromGameObject();
  }
}

export default PongScene;

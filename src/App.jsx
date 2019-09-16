import React, { useRef, useEffect } from 'react';
import makeDrawer from './app/drawer';
import makeGame from './app/game';
import makeController from './app/controller';
import makeEngine from './app/engine/engine';

const interval = 8;

function playGame(canvas) {
    // ------------------------------------------------------------------------------------------- //
    //     User input functions for controller                                                     //
    // ------------------------------------------------------------------------------------------- //

    const startLeft = () => { game.player.movingLeft = true; };
    const stopLeft = () => { game.player.movingLeft = false; };
    const startRight = () => { game.player.movingRight = true; };
    const stopRight = () => { game.player.movingRight = false; };
    const startUp = () => { game.player.movingUp = true; };
    const stopUp = () => { game.player.movingUp = false; };
    const startDown = () => { game.player.movingDown = true; };
    const stopDown = () => { game.player.movingDown = false; };

    // ------------------------------------------------------------------------------------------- //
    //     Render and update functions that will be executed periodically by engine                //
    // ------------------------------------------------------------------------------------------- //

    const render = () => {
        drawer.renderBackground();
        drawer.renderObstacle(game.obstacle.x, game.obstacle.y, game.obstacle.width, game.obstacle.height);
        drawer.renderPlayer(game.player.x, game.player.y, game.player.width, game.player.height);
    }

    const update = () => {
        if (game.player.movingLeft) { game.player.x -= interval / 2; }
        if (game.player.movingRight) { game.player.x += interval / 2; }
        if (game.player.movingUp) { game.player.y -= interval / 2; }
        if (game.player.movingDown) { game.player.y += interval / 2; }
    }

    // ------------------------------------------------------------------------------------------- //
    //     Elements for handling game logic, user input, canvas drawing and render/update loop     //
    // ------------------------------------------------------------------------------------------- //

    const game = makeGame();
    const drawer = makeDrawer(canvas);
    const engine = makeEngine(render, update, interval);
    makeController(startLeft, stopLeft, startRight, stopRight, startUp, stopUp, startDown, stopDown);

    // ------------------------------------------------------------------------------------------- //
    //     Arrange entities with given coordinates                                                 //
    // ------------------------------------------------------------------------------------------- //

    game.obstacle.x = canvas.width / 2 - game.obstacle.width / 2;
    game.obstacle.y = canvas.height * 0.7;

    game.player.x = canvas.width / 2 - game.player.width / 2;
    game.player.y = canvas.height * 0.2;

    // ------------------------------------------------------------------------------------------- //
    //     Start the game and return stop function for cleanup                                     //
    // ------------------------------------------------------------------------------------------- //

    engine.start();
    return engine.stop;
}

function App() {
    const canvasRef = useRef();

    useEffect(() => playGame(canvasRef.current));

    return <canvas ref={canvasRef} width="500" height="500" />;
}

export default App;

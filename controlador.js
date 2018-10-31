var juego = new Phaser.Game( 400, 400, Phaser.CANVAS, "consola");


juego.state.add( "jugar", jugar );
juego.state.add( "finJuego", finJuego );
juego.state.start( "jugar" );

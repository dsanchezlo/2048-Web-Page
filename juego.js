//Tablero 4x4
var tablero = new Array(4);
for (var i = 0; i < 4; i++){
  tablero[i] = new Array(4);
}

//Llenar de espacio vacios (Ceros) el arreglo interno
for (var i = 0; i < 4; i++){
  for (var j = 0; j < 4; j++){
    tablero[i][j] = '0';
  }
}

//Numero entero aleatorio entre 1 y 2
var aleatorio = Math.floor( (Math.random() * 2 ) + 1 );
//Numero entero aleatorio entre 0 y 3, luego se consigue la ubicacion en pixeles de la casilla escogida (De 0 a 3) (Coordenada en "x" y en "y").
var corx = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;
var cory = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;

var jugar = {

  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    juego.load.image( "fondo"  , "imagenes/tablero.jpg"     );
    juego.load.image( "num2"   , "imagenes/cuadro_2.png"    );
    juego.load.image( "num4"   , "imagenes/cuadro_4.png"    );
    juego.load.image( "num8"   , "imagenes/cuadro_8.png"    );
    juego.load.image( "num16"  , "imagenes/cuadro_16.png"   );
    juego.load.image( "num32"  , "imagenes/cuadro_32.png"   );
    juego.load.image( "num64"  , "imagenes/cuadro_64.png"   );
    juego.load.image( "num128" , "imagenes/cuadro_128.png"  );
    juego.load.image( "num256" , "imagenes/cuadro_256.png"  );
    juego.load.image( "num512" , "imagenes/cuadro_512.png"  );
    juego.load.image( "num1024", "imagenes/cuadro_1024.png" );
    juego.load.image( "num2048", "imagenes/cuadro_2048.png" );
  },

  create: function() {
    juego.add.tileSprite( 0, 0, 400, 400, "fondo" );

    //Añadir 2 o 4
    if (aleatorio == 1){
      juego.add.tileSprite( corx, cory, 78, 78, "num2" );
    } else {
      juego.add.tileSprite( corx, cory, 78, 78, "num4" );
    }

    //Ocupar el espacio en la matriz interna del número añadido.
    tablero[((corx - 22) / 93)][((cory - 22) / 93)] = aleatorio * 2;
  },

  update: function() {
    //Revisar si ya está llena la matriz
    var flag = false;
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 4; j++){
        if (tablero [i][j] == 0){
          flag = true;
        }
      }
    }

    //Si todavía hay espacio, seguir jugando.
    if ( flag == true ){
      this.valoresRandom();

      //Añade un 2 o un 4
      this.bloqueRandom();
    } else {
      juego.state.start( "finJuego");
    }
  },

  valoresRandom: function(){

    aleatorio = Math.floor( (Math.random() * 2 ) + 1 );
    corx = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;
    cory = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;

    //Revisar si la coordenada "x" y "y" aleatoria ya está ocupada.
    while ( tablero[((corx - 22) / 93)][((cory - 22) / 93)] != 0 ){
      corx = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;
      cory = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;
    }

  },

  bloqueRandom: function(){

    if (aleatorio == 1){
      juego.add.tileSprite( corx, cory, 78, 78, "num2" );
    } else {
      juego.add.tileSprite( corx, cory, 78, 78, "num4" );
    }
    tablero[((corx - 22) / 93)][((cory - 22) / 93)] = aleatorio * 2;

  }
}

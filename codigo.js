var juego = new Phaser.Game( 400, 400, Phaser.CANVAS, "consola");

var tablero = new Array(4);
tablero[0] = new Array(4);
tablero[1] = new Array(4);
tablero[2] = new Array(4);
tablero[3] = new Array(4);

var n2;
var n4;
var n8;
var n16;
var n32;
var n64;
var n128;
var n256;
var n512;
var n1024;
var n2048;

var jugar = {
  preload: function() {
    juego.load.image( "fondo", "imagenes/tablero.jpg" );
    juego.load.image( "num2", "imagenes/cuadro_2.png" );
    juego.load.image( "num4", "imagenes/cuadro_4.png" );
    juego.load.image( "num8", "imagenes/cuadro_8.png" );
    juego.load.image( "num16", "imagenes/cuadro_16.png" );
    juego.load.image( "num32", "imagenes/cuadro_32.png" );
    juego.load.image( "num64", "imagenes/cuadro_64.png" );
    juego.load.image( "num128", "imagenes/cuadro_128.png" );
    juego.load.image( "num256", "imagenes/cuadro_256.png" );
    juego.load.image( "num512", "imagenes/cuadro_512.png" );
    juego.load.image( "num1024", "imagenes/cuadro_1024.png" );
    juego.load.image( "num2048", "imagenes/cuadro_2048.png" );
  },
  create: function() {
    tablero = juego.add.tileSprite( 0, 0, 400, 400, "fondo" );
    n2 = juego.add.tileSprite( 22, 22, 78, 78, "num2" );
    n4 = juego.add.tileSprite( 115, 22, 78, 78, "num4" );
    n8 = juego.add.tileSprite( 207, 22, 78, 78, "num8" );
    n16 = juego.add.tileSprite( 300, 22, 78, 78, "num16" );
    n32 = juego.add.tileSprite( 22, 115, 78, 78, "num32" );
    n64 = juego.add.tileSprite( 115, 115, 78, 78, "num64" );
    n128 = juego.add.tileSprite( 207, 115, 78, 78, "num128" );
    n256 = juego.add.tileSprite( 300, 115, 78, 78, "num256" );
    n512 = juego.add.tileSprite( 22, 207, 78, 78, "num512" );
    n1024 = juego.add.tileSprite( 115, 207, 78, 78, "num1024" );
    n2048 = juego.add.tileSprite( 207, 207, 78, 78, "num2048" );
  },
  update: function() {

  }
};

juego.state.add( "activo", jugar );
juego.state.start( "activo" );

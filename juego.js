//Tablero 4x4
var tablero = new Array(4);
for (var i = 0; i < 4; i++){
  tablero[i] = new Array(4);
}

//Espacio para almacenar los sprites
var sprites = new Array(4);
for (var i = 0; i < 4; i++){
  sprites[i] = new Array(4);
}

//Numero entero aleatorio entre 1 y 2
var aleatorio = Math.floor( (Math.random() * 2 ) + 1 );
//Numero entero aleatorio entre 0 y 3, luego se consigue la ubicacion en pixeles de la casilla escogida (De 0 a 3) (Coordenada en "x" y en "y").
var corx = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;
var cory = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;

var fArriba;
var fDerecha;
var fAbajo;
var fIzquierda;

//Guarda la tecla que se presionó
var presArriba;
var presDerecha;
var presAbajo;
var presIzquierda;

var xmove;
var ymove;
var avance;

//Está llena o nó la matriz
var flag = true;

//Cuenta los espacios en blanco
var contador;
//Almacena la casilla en la que se combinó ( No se puede combinar más de dos veces en la misma casilla )
var combinar;
//Dice si se hizo o no un movimiento
var movimiento = false;

var jugar = {

  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    juego.load.image( "fondo"  , "imagenes/tablero.jpg"     );
    juego.load.image( "num0"   , "imagenes/cuadro_0.png"    );
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
    fArriba = juego.input.keyboard.addKey( Phaser.Keyboard.UP );
    fDerecha = juego.input.keyboard.addKey( Phaser.Keyboard.RIGHT );
    fAbajo = juego.input.keyboard.addKey( Phaser.Keyboard.DOWN );
    fIzquierda = juego.input.keyboard.addKey( Phaser.Keyboard.LEFT );

    juego.add.tileSprite( 0, 0, 400, 400, "fondo" );

    //Llenar de espacio vacios (Ceros) el arreglo interno y el de sprites
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 4; j++){
        this.nuevoBloque( i, j, 0 );
      }
    }

    this.valoresRandom();
    this.nuevoBloque( corx, cory, aleatorio * 2 );

    this.valoresRandom();
    this.nuevoBloque( corx, cory, aleatorio * 2 );
  },

  update: function() {
    presArriba = fArriba.downDuration(1);
    presDerecha = fDerecha.downDuration(1);
    presAbajo = fAbajo.downDuration(1);
    presIzquierda = fIzquierda.downDuration(1);

    if ( presArriba || presDerecha || presAbajo || presIzquierda ){

      if ( flag == true ){
      contador = 0;
      combinar = -1;
      movimiento = false;
        if ( presArriba ){
          for (var i = 0; i < 4; i++){
            contador = 0;
            combinar = -1;
            for (var j = 0; j < 4; j++){
              if (tablero[i][j] == 0){
                contador++;
              } else {
                if (contador >= 1){
                  //xmove = i;
                  //ymove = j;
                  //avance = contador * -1;
                  this.nuevoBloque( i, j - contador, tablero[i][j]);
                  this.nuevoBloque( i, j, 0);
                  movimiento = true;
                  //this.moverBloque( "v" );
                }
                if ( ((j - contador - 1) >= 0) && ( tablero[i][j - contador] ==   tablero[i][j - contador - 1]) && ( j - contador - 1 != combinar ) ){
                  this.nuevoBloque( i, j - contador - 1, (tablero[i][j - contador - 1] +   tablero[i][j - contador]) );
                  this.nuevoBloque( i, j - contador, 0);
                  combinar = j - contador - 1;
                  contador++;
                  movimiento = true;
                }
              }
            }
          }
        }
        if ( presDerecha ){
          for (var j = 0; j < 4; j++){
            contador = 0;
            combinar = -1;
            for (var i = 3; i >= 0 ; i--){
              if (tablero[i][j] == 0){
                contador++;
              } else {
                if (contador >= 1){
                  this.nuevoBloque( i + contador, j, tablero[i][j]);
                  this.nuevoBloque( i, j, 0);
                  movimiento = true;
                }
                if ( ((i + contador + 1) <= 3) && ( tablero[i + contador][j] ==   tablero[i + contador + 1][j]) && ( i + contador + 1 != combinar ) ){
                  this.nuevoBloque( i + contador + 1, j, (tablero[i + contador + 1][j] +   tablero[i + contador][j]));
                  this.nuevoBloque( i + contador, j, 0);
                  combinar = i + contador + 1;
                  contador++;
                  movimiento = true;
                }
              }
            }
          }
        }
        if ( presAbajo ){
          for (var i = 0; i < 4; i++){
            contador = 0;
            combinar = -1;
            for (var j = 3; j >= 0 ; j--){
              if (tablero[i][j] == 0){
                contador++;
              } else {
                if (contador >= 1){
                  this.nuevoBloque( i, j + contador, tablero[i][j]);
                  this.nuevoBloque( i, j, 0);
                  movimiento = true;
                }
                if ( ((j + contador + 1) <= 3) && ( tablero[i][j + contador] ==   tablero[i][j + contador + 1]) && ( j + contador + 1 != combinar ) ){
                  this.nuevoBloque( i, j + contador + 1, (tablero[i][j + contador + 1] +   tablero[i][j + contador]) );
                  this.nuevoBloque( i, j + contador, 0);
                  combinar = j + contador + 1;
                  contador++;
                  movimiento = true;
                }
              }
            }
          }
        }
        if ( presIzquierda ){
          for (var j = 0; j < 4; j++){
            contador = 0;
            combinar = -1;
            for (var i = 0; i < 4 ; i++){
              if (tablero[i][j] == 0){
                contador++;
              } else {
                if (contador >= 1){
                  this.nuevoBloque( i - contador, j, tablero[i][j]);
                  this.nuevoBloque( i, j, 0);
                  movimiento = true;
                }
                if ( ((i - contador - 1) >= 0) && ( tablero[i - contador][j] ==   tablero[i - contador - 1][j]) && ( i - contador - 1 != combinar ) ){
                  this.nuevoBloque( i - contador - 1, j, (tablero[i - contador - 1][j] +   tablero[i - contador][j]) );
                  this.nuevoBloque( i - contador, j, 0);
                  combinar = i - contador - 1;
                  contador++;
                  movimiento = true;
                }
              }
            }
          }
        }
        //Si algo se movió, agregar bloque
        if ( movimiento == true ){
          this.valoresRandom();
          //Añade un bloque (Dos o cuatro)
          this.nuevoBloque(corx, cory, aleatorio * 2);
        }

        flag = false;
        //Revisar si ya está llena la matriz, y si todavía hay espacio, seguir jugando.
        for (var i = 0; i < 4; i++){
          for (var j = 0; j < 4; j++){
            if (tablero [i][j] == 0){
              flag = true;
            }
          }
        }
        //Si la matriz está llena, pero hay cuadros por combinar, seguir jugando.
        if ( flag == false ){
          for (var i = 0; i < 4; i++){
            for (var j = 1; j < 4; j++){
              if ( tablero[i][j] == tablero[i][j - 1] || tablero[j][i] == tablero[j - 1][i]){
                flag = true;
              }
            }
          }
        }

      } else {
        juego.state.start( "finJuego");
      }
    }
  },

  valoresRandom: function(){

    aleatorio = Math.floor( (Math.random() * 2 ) + 1 );
    corx = ( Math.floor( Math.	random() * 4 ) * 93 ) + 22;
    cory = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;

    //Revisar si la coordenada "x" y "y" aleatoria ya está ocupada.
    while ( tablero[((corx - 22) / 93)][((cory - 22) / 93)] != 0 ){
      corx = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;
      cory = ( Math.floor( Math.random() * 4 ) * 93 ) + 22;
    }

  },

  nuevoBloque: function( x, y, valor ){
    if ( x > 3 && y > 3 ){
      x = (x - 22) / 93;
      y = (y - 22) / 93;
    }
    tablero[x][y] = valor;
    var valorString = "string";
    valorString = valor;
    sprites[x][y] = juego.add.sprite( ((x * 93) + 22) , ((y * 93) + 22), "num" + valorString );
  },

  moverBloque: function( dir ){
    if ( dir == "h" ){
      juego.time.events.repeat(Phaser.Timer.SECOND / 100000, 20, this.moverHorizontal );
    } else if ( dir == "v" ){
      juego.time.events.repeat(Phaser.Timer.SECOND / 100000, 20, this.moverVertical );
      sprites[xmove][ymove + (avance * -1)] = juego.add.sprite( ((xmove * 93) + 22) , ((ymove * 93) + 22), ("num" + tablero[xmove][ymove]));
      sprites[xmove][ymove] = juego.add.sprite( ((xmove * 93) + 22) , ((ymove * 93) + 22), "num2048");
      tablero[xmove][ymove + (avance * -1)] = tablero[xmove][ymove];
      tablero[xmove][ymove] = 0;
    }
  },

  moverHorizontal: function(){
    sprites[x][y].x += ( 4.65 * avance );
  },

  moverVertical: function(){
    sprites[xmove][ymove].y += ( 4.65 * avance );
  }
}


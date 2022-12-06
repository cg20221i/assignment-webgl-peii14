  
  // color :)
  var black1 		= [ 0.5, 0.5, 0.5 ];
  var white 	= [ 1., 1., 1. ];
  
  // surface orientation :)
  var xp = [1, 0, 0];
  var xn = [-1, 0, 0];
  var yp = [0, 1, 0];
  var yn = [0, -1, 0];
  var zp = [0, 0, 1];
  var zn = [0, 0, -1];
  

  
  var cube_a2_i = 24;
  var cube_b1_i = 24 * 2;
  var lens_a1_i = (24 * 3) ;
  
  var indices = [
    0, 1, 2,     0, 2, 3,     // Face A
    4, 5, 6,     4, 6, 7,     // Face B
    8, 9, 10,    8, 10, 11,   // Face C
    12, 13, 14,  12, 14, 15,  // Face D
    16, 17, 18,  16, 18, 19,  // Face E
    20, 21, 22,  20, 22, 23,  // Face F 
    
  ];
  
  var plane_color = [20/255.0 , 100/255.0, 100/255.0];
  var plane = [
    20.0, -0.3, 20.0,  ...plane_color, ...yp,
    20.0, -0.3, -20.0, ...plane_color, ...yp,
    -20.0, -0.3, -20.0, ...plane_color, ...yp,
    -20.0, -0.3, 20.0, ...plane_color, ...yp,
  ];
  
  var indices_place = [
    0, 1, 2,     0, 2, 3,    
  ];
  
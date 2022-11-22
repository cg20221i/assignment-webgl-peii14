(function(global) {

    let canvas, gl, program;
  
    glUtils.SL.init({ callback:function() { main(); } });
  
    function main() {

      window.addEventListener('resize', resizer);
      canvas = document.getElementById("myCanvas");
      gl = glUtils.checkWebGL(canvas);
      let vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
          fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      gl.useProgram(program);
  
      resizer();
    }

    function draw() {
      gl.clearColor(0.22, 0.29, 0.22, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      NRP();
      Name('A',0.0,0.0);
    //   Name('A',0.02,0.02);
      Name('N',0.25,0)
    //   Name('N',0.27,0.02)
    //   Name('N2',0.24,0)
    //   Name('N3',0.25)
    }
  
    function NRP() {
      var n = initLineBuffers();
      gl.drawArrays(gl.LINES, 0, n);
    }

    function eightBit(spacerX,spacerY , number){
        let top = [
            0.0 + spacerX, 0.25 +spacerY,
            0.15 + spacerX, 0.25 +spacerY, 
        ];
        let l1 = [
            top[0] ,top[1],
            top[0] , top[3] - 0.2 ,
        ]
        let l2 = [
            top[0] , l1[3],
            top[0] , l1[3] - 0.2 ,
        ]
        let r1 = [
            top[2],top[3],
            top[2], l1[3]
        ]
        let r2 = [
            top[2], r1[3],
            top[2], l2[3] 
        ]
        let mid = [
            l1[2],l1[3],
            r1[2], r1[3]
        ]
        let bottom = [
            top[0], l2[3],
            top[2] , l2[3]
        ]
        let topL = [
            0.0 + spacerX, 0.25, 
        ]
        let topR = [
            0.15 + spacerX, 0.25, 
       ]
        let midTop =[
            top[2] - 0.075, top[1]
        ]
        let bottomR = [
            top[2] , l2[3]
        ]
        let bottomL = [
            top[0], l2[3],
        ]
        let midBottom = [
            top[0] + 0.075, l2[3],
        ]
        let midL = [
            top[0] , top[3] - 0.2 
        ]
        let midR = [
            top[2], l1[3]
        ]
        let spcTopMid = [
            top[2] - 0.1, top[1]
        ]
        let spcBottomMid = [
            top[2] - 0.1, l2[3]
        ]
        let planeTopLeft = [
            0.0 + spacerX , 0.25+spacerY,
            topL[0] - 0.03, 0.25,
        ]
        let planeTopRight = [
            0.15 + spacerX , 0.25+spacerY,
            topR[0] - 0.03 , 0.25,
        ]
        let planeBottomLeft = [
            planeTopLeft[0],planeTopLeft[1] - 0.4,
            planeTopLeft[2],planeTopLeft[3] - 0.4
        ]
        let planeBottomRight = [
            planeTopRight[0],planeTopRight[1] - 0.4,
            planeTopRight[2],planeTopRight[3] - 0.4
        ]
        let planeMidLeft = [
            planeTopLeft[0],planeTopLeft[1] - 0.2,
            planeTopLeft[2],planeTopLeft[3] - 0.2
        ]
        let planeMidRight = [
            planeTopRight[0],planeTopLeft[1] - 0.2,
            planeTopRight[2],planeTopLeft[3] - 0.2
        ]
        let planeR2 = [
            top[2] , r1[3] ,
            top[2] , l2[3]  
        ]

        let result
        if (number == 0){
            result = top.concat(l1,l2 ,r2 ,r1 ,bottom)
            if(spacerY > 0){
                result = result.concat(planeTopLeft,planeTopRight,planeBottomLeft, planeBottomRight,)
            }
            result = result.concat()
        }else if (number == 2 ){
            result = top.concat(r1,mid,l2,bottom)
            if(spacerY > 0){
                result = result.concat(planeTopLeft, planeTopRight,planeBottomLeft, planeBottomRight, planeMidLeft, planeMidRight)
            }
        }else if (number == 'A'){
            result = midTop.concat(r2,l2)
            if(spacerY > 0){
                result = result.concat()
            }
        }else if (number == 'N'){
            result = bottomL.concat(topL,spcTopMid, spcBottomMid)
        }else if (number == 'N2'){
            result = topR.concat(midTop, bottomR) 
        }
    
        return result
    }
    function initLineBuffers(number) {
        let tmp = eightBit(-0.5,0,0)
        tmp = tmp.concat(eightBit(-0.47,0.05,0))
        tmp = tmp.concat(eightBit(-0.25,0,2))
        tmp = tmp.concat(eightBit(-0.22,0.05,2))

        let vertices = new Float32Array(tmp);
        let n = vertices.length/2;
    
        let vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
      }
  
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        let aPosition = gl.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
            console.log('Failed to get the storage location of aPosition');
            return -1;
        }
    
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        return n;
    }
 
    function Name(letter, spacerX,spacerY) {
        let n = initTriangleBuffers(letter,spacerX,spacerY);
        gl.drawArrays(gl.LINES, 0, n);
        // gl.drawElements
    }
  
    function initTriangleBuffers(letter, spacerX,spacerY) {
        let tmp = eightBit(spacerX, spacerY,letter)
        let vertices = new Float32Array(tmp);
        let n = vertices.length/2;
    
        let vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
    
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        let aPosition = gl.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
            console.log('Failed to get the storage location of aPosition');
            return -1;
        }
    
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        return n;
    }

    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        draw();
    }
  
  })(window || this);
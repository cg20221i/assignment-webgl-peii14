(function(global) {

    var canvas, gl, program;
  
    glUtils.SL.init({ callback:function() { main(); } });
  
    function main() {

      window.addEventListener('resize', resizer);
      canvas = document.getElementById("myCanvas");
      gl = glUtils.checkWebGL(canvas);
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
          fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      gl.useProgram(program);
  
      resizer();
    }

    function draw() {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      NRP();
      Name();
    }
  
    function NRP() {
      var n = initLineBuffers();
      gl.drawArrays(gl.LINES, 0, n);
    }

    function eightBit(spacer , number){
        let top = [
            0.0 + spacer, 0.25, 
            0.15 + spacer, 0.25, 
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
        let result
        if (number == 0){
            result = top.concat(l1,l2 ,r2 ,r1 ,bottom)
        }else if (number == 2 ){
            result = top.concat(r1,mid,l2,bottom)
        }
    
        return result
    }
  
    function initLineBuffers() {
        var tmp = eightBit(-0.5,0)
        tmp = tmp.concat(eightBit(-0.25,2))
        var vertices = new Float32Array(tmp);
        var n = vertices.length/2;
    
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
      }
  
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        var aPosition = gl.getAttribLocation(program, 'aPosition');
        if (aPosition < 0) {
            console.log('Failed to get the storage location of aPosition');
            return -1;
        }
    
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        return n;
    }
  
    function Name() {
        var n = initTriangleBuffers();
        gl.drawArrays(gl.TRIANGLES, 0, n);
    }
  
    function initTriangleBuffers() {
        var tmp = eightBit(0.0,0)
        var vertices = new Float32Array(tmp);
        var n = vertices.length/2;
    
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
    
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        var aPosition = gl.getAttribLocation(program, 'aPosition');
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
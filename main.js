function main() {
    let canvas = document.getElementById("myCanvas");
    let gl = canvas.getContext("webgl");


    let vertices = eightBit();
    
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    

    // VERTEX SHADER
    let vertexShaderCode = `
        attribute vec2 aPosition;
        void main () {
            gl_PointSize = 15.0;
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // FRAGMENT SHADER
    let fragmentShaderCode = `
        void main() {
            gl_FragColor = vec4(0.5, 1, 0.5, 1.0);
        }
    `;
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    let aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 0.5,   0.5,  1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINES, 0, vertices.length / 2);
}

function eightBit(){
    let top = [
        0.0, 0.0, 
        0.2, 0.0, 
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
    let bottom = [
        top[0], l2[3],
        top[2] , l2[3]
    ]

    result = top.concat(l1 , l2)

    return result


}
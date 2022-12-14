function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
	var cube_box = 24 * 4;

    var vertices = [
        // Face A       // Red      // Surface orientation
        0,  0,   2.5,     1, 0, 0,    0, 0, -1,   // Index:  0    
         0, -1, 0,     1, 0, 0,    0, 0, -1,   // Index:  1
         0,  0, 1,     1, 0, 0,    0, 0, -1,   // Index:  2
        0,  1, 0,     1, 0, 0,    0, 0, -1,   // Index:  3
        // Face B       // Yellow
        0, 0,  2.5,     1, 1, 0,    0, 0, 1,    // Index:  4
        -0.7,-0.97,0,     1, 1, 0,    0, 0, 1,    // Index:  5
         -0.5,  0,  1,     1, 1, 0,    0, 0, 1,    // Index:  6
        -0.72,  1.05,  0,     1, 1, 0,    0, 0, 1,    // Index:  7
        // Face C       // Green
        0, 0, 2.5,     0, 1, 0,    -1, 0, 0,   // Index:  8
        0,  -1, 0,     0, 1, 0,    -1, 0, 0,   // Index:  9
        -0.7,  -0.97,  0,     0, 1, 0,    -1, 0, 0,   // Index: 10
        0, 0,  2.5,     0, 1, 0,    -1, 0, 0,   // Index: 11
        // Face D       // Blue
        0, 0, 2.5,      0, 0, 1,    1, 0, 0,    // Index: 12
         -0.72,  1.05, 0,     0, 0, 1,    1, 0, 0,    // Index: 13
         0,  1,  0,     0, 0, 1,    1, 0, 0,    // Index: 14
         0, 0, 2.5,      0, 0, 1,    1, 0, 0,    // Index: 15
        // Face E       // Orange
        0, 0, 1,     1, 0.5, 0,  0, -1, 0,   // Index: 16
        -0.5, 0,  1,     1, 0.5, 0,  0, -1, 0,   // Index: 17
         -0.7, -0.97,  0,     1, 0.5, 0,  0, -1, 0,   // Index: 18
         0, -1, 0,     1, 0.5, 0,  0, -1, 0,   // Index: 19
        // Face F       // White
        0,  0, 1,     1, 1, 1,    0, 1, 0,    // Index: 20
        -0.5,  0,  1,     1, 1, 1,    0, 1, 0,    // Index: 21
         0,  1,  0,     1, 1, 1,    0, 1, 0,    // Index: 22
         -0.72,  1.05, 0,     1, 1, 1,    0, 1, 0,     // Index: 23
    ];

    var indices = [
        0, 1, 2,     0, 2, 3,     // Face A
        4, 5, 6,     4, 6, 7,     // Face B
        8, 9, 10,    8, 10, 11,   // Face C
        12, 13, 14,  12, 14, 15,  // Face D
        16, 17, 18,  16, 18, 19,  // Face E
        20, 21, 22,  20, 22, 23 ,  // Face F 
        
     
        
    ];

    var box_center = [0.0, 0.0, 0.0];
	var box = [
		// cube light
		-0.1,  0.1, 0.1, ...white, ...zn, //0
		0.1,  0.1, 0.1, ...white, ...zn, //1
		0.1, -0.1, 0.1, ...white, ...zn, //2
		-0.1, -0.1, 0.1, ...white, ...zn, //3

		-0.1,  0.1, -0.1, ...white, ...zp, //4
		0.1,  0.1, -0.1, ...white, ...zp, //5
		0.1, -0.1, -0.1, ...white, ...zp, //6
		-0.1, -0.1, -0.1, ...white, ...zp, //7
  
		0.1,  0.1, 0.1, ...white, ...xn, //8
		0.1, -0.1, 0.1, ...white, ...xn, //9
		0.1, -0.1, -0.1, ...white, ...xn, //11
		0.1,  0.1, -0.1, ...white, ...xn, //10
		
		-0.1,  0.1, 0.1, ...white, ...xp, //12
		-0.1,  0.1, -0.1, ...white, ...xp, //13
		-0.1, -0.1, -0.1, ...white, ...xp, //14
		-0.1, -0.1, 0.1, ...white, ...xp, //15
		
		-0.1,  0.1, 0.1, ...white, ...yn, //16
		0.1,  0.1, 0.1, ...white, ...yn, //17
		0.1,  0.1, -0.1, ...white, ...yn, //18
		-0.1,  0.1, -0.1, ...white, ...yn, //19
		
		-0.1, -0.1, 0.1, ...white, ...yp, //20
		0.1, -0.1, 0.1, ...white, ...yp, //21
		0.1, -0.1, -0.1, ...white, ...yp, //22
		-0.1, -0.1, -0.1, ...white, ...yp, //23


		0 + cube_box, 1 + cube_box, 2 + cube_box,     0 + cube_box, 2 + cube_box, 3 + cube_box,     // Face A
		4 + cube_box, 5 + cube_box, 6 + cube_box,     4 + cube_box, 6 + cube_box, 7 + cube_box,     // Face B
		8 + cube_box, 9 + cube_box, 10 + cube_box,    8 + cube_box, 10 + cube_box, 11 + cube_box,   // Face C
		12 + cube_box, 13 + cube_box, 14 + cube_box,  12 + cube_box, 14 + cube_box, 15 + cube_box,  // Face D
		16 + cube_box, 17 + cube_box, 18 + cube_box,  16 + cube_box, 18 + cube_box, 19 + cube_box,  // Face E
		20 + cube_box, 21 + cube_box, 22 + cube_box,  20 + cube_box, 22 + cube_box, 23 + cube_box,  // Face F 
	];
	
	for (var it = 0; it < box.length; it += 9) {
		box[it + 0] += box_center[0];
		box[it + 1] += box_center[1];
		box[it + 2] += box_center[2];
	}
	vertices.push(...box);
	// indices.push(...box_index);

    // Create a linked-list for storing the vertices data in the GPU realm
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // VERTEX SHADER
    var vertexShaderCode = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute vec3 aNormal;
        uniform mat4 uModel;
        uniform mat4 uView;
        uniform mat4 uProjection;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying vec3 vNormal;
        void main () {
            vec4 position = vec4(aPosition, 1.0);
            gl_Position = uProjection * uView * uModel * position;
            // gl_Position is the final destination for storing
            //  positional data for the rendered vertex
            vColor = aColor;
            vNormal = aNormal;
            vPosition = (uModel * position).xyz;
        }
    `;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // FRAGMENT SHADER
    var fragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        uniform vec3 uLightConstant;      // It represents the light color
        uniform float uAmbientIntensity;  // It represents the light intensity
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform vec3 uLightPosition;
        uniform vec3 uViewerPosition;
        uniform mat3 uNormalModel;
        void main() {
            vec3 ambient = uLightConstant * uAmbientIntensity;
            vec3 lightDirection = uLightPosition - vPosition;
            vec3 normalizedLight = normalize(lightDirection);
            vec3 normalizedNormal = normalize(uNormalModel * vNormal);
            float cosTheta = dot(normalizedNormal, normalizedLight);
            vec3 diffuse = vec3(0.0, 0.0, 0.0);
            if (cosTheta > 0.0) {
                float diffuseIntensity = cosTheta;
                diffuse = uLightConstant * diffuseIntensity;
            }
            vec3 normalizedReflector = normalize(reflect(-lightDirection, normalizedNormal));
            vec3 normalizedViewer = normalize(uViewerPosition - vPosition);
            float cosPhi = dot(normalizedReflector, normalizedViewer);
            vec3 specular = vec3(0., 0., 0.);
            if (cosPhi > 0.) {
                float shininessConstant = 100.0;    // bare minimum spec for metal
                float specularIntensity = pow(cosPhi, shininessConstant);
                specular = uLightConstant * specularIntensity;
            }
            vec3 phong = ambient + diffuse + specular;
            gl_FragColor = vec4(phong * vColor, 1.0);
            // gl_FragColor is the final destination for storing
            //  color data for the rendered fragment
        }
    `;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // Comparing to C-Programming, we may imagine
    //  that up to this step we have created two
    //  object files (.o), for the vertex and fragment shaders

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Local variables
    var isAnimated = false;
    var theta = 0.0;
    var direction = "";
    var dX = 0.0;
    var dY = 0.0;
    // For the model (all linear transformation)
    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    // For the camera
    var camera = [0.0, 0.0, 5.0];
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var view = glMatrix.mat4.create();  // Create an identity matrix
    glMatrix.mat4.lookAt(
        view,
        camera,
        [camera[0], 0.0, -10.0],
        [0.0, 1.0, 0.0]
    );
    gl.uniformMatrix4fv(uView, false, view);
    // For the projection
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    var perspective = glMatrix.mat4.create();
    glMatrix.mat4.perspective(
        perspective,
        Math.PI/3,  // 60 degrees
        1.0,
        0.5, 
        10.0
    );
    gl.uniformMatrix4fv(uProjection, false, perspective);

    // For the lighting and shading
    var uLightConstant = gl.getUniformLocation(shaderProgram, "uLightConstant");
        // Ambient
    var uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
    gl.uniform3fv(uLightConstant, [1.0, 1.0, 1.0]);   // white color
    gl.uniform1f(uAmbientIntensity, 0.4);             // 40% intensity
        // Diffuse
    var uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
    gl.uniform3fv(uLightPosition, [1.0, 0.0, 1.0]);
    var uNormalModel = gl.getUniformLocation(shaderProgram, "uNormalModel");
        // Specular
    var uViewerPosition = gl.getUniformLocation(shaderProgram, "uViewerPosition");

    // Local functions
        // MOUSE
    var dragging, prevx, prevy, rotation = glMatrix.mat4.create();
    function onMouseDown (event) {
        var x = event.clientX;
        var y = event.clientY;
        var rect = event.target.getBoundingClientRect();
        if (
            rect.left <= x &&
            rect.right >= x &&
            rect.top <= y &&
            rect.bottom >= y
        ) {
            dragging = true;
            prevx = x;
            prevy = y;
        }
    }
    function onMouseUp (event) {
        dragging = false;
    }
    function onMouseMove (event) {
        if (dragging) {
            var x = event.clientX;
            var y = event.clientY;
            var xdiff = x - prevx;
            var ydiff = y - prevy;
            glMatrix.mat4.rotateY(rotation, rotation, glMatrix.glMatrix.toRadian(xdiff/10));
            glMatrix.mat4.rotateX(rotation, rotation, glMatrix.glMatrix.toRadian(ydiff/10));
        }
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
        // KEYBOARD
    function onKeyDown (event) {
        switch (event.keyCode) {
            case 87: // Object UP
                direction = "up";
                break;
            case 83: // Object DOWN
                direction = "down";
                break;
            case 68: // Object RIGHT
                direction = "right";
                break;
            case 65: // Object LEFT
                direction = "left";
                break;
            case 38: // Camera UP
                camera[1] += 0.05;
                gl.uniform3fv(uViewerPosition, camera);
                glMatrix.mat4.lookAt(
                    view,
                    camera,
                    [camera[0], 0.0, -10.0],
                    [0.0, 1.0, 0.0]
                );
                gl.uniformMatrix4fv(uView, false, view);
                break;
            case 40: // Camera DOWN
                camera[1] -= 0.05;
                gl.uniform3fv(uViewerPosition, camera);
                glMatrix.mat4.lookAt(
                    view,
                    camera,
                    [camera[0], 0.0, -10.0],
                    [0.0, 1.0, 0.0]
                );
                gl.uniformMatrix4fv(uView, false, view);
                break;
            case 39: // Camera RIGHT
                camera[0] += 0.05;
                gl.uniform3fv(uViewerPosition, camera);
                glMatrix.mat4.lookAt(
                    view,
                    camera,
                    [camera[0], 0.0, -10.0],
                    [0.0, 1.0, 0.0]
                );
                gl.uniformMatrix4fv(uView, false, view);
                break;
            case 37: // Camera LEFT
                camera[0] -= 0.05;
                gl.uniform3fv(uViewerPosition, camera);
                glMatrix.mat4.lookAt(
                    view,
                    camera,
                    [camera[0], 0.0, -10.0],
                    [0.0, 1.0, 0.0]
                );
                gl.uniformMatrix4fv(uView, false, view);
                break;
            default:
                break;
        }
    }
    function onKeyUp (event) {
        direction = "";
    }
    function onKeyPress (event) {
        console.log('keypress');
        if (event.keyCode == 32) {  // Space button
            isAnimated = !isAnimated;
        }
    }
    document.addEventListener("keypress", onKeyPress)
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    // Teach the GPU how to collect
    //  the positional values from ARRAY_BUFFER
    //  for each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        3, 
        gl.FLOAT, 
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT, 
        0);
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT, 
        3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);
    var aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
    gl.vertexAttribPointer(
        aNormal, 
        3, 
        gl.FLOAT, 
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT, 
        6 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aNormal);
    
    function render() {
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0,   0.0,  1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var model = glMatrix.mat4.create();
        if (isAnimated) {
            theta += 0.01;
        }
        switch (direction) {
            case "up":
                dY += 0.1;
                break;
            case "down":
                dY -= 0.1;
                break;
            case "left":
                dX -= 0.1;
                break;
            case "right":
                dX += 0.1;
                break;
        
            default:
                break;
        }
        glMatrix.mat4.translate(model, model, [dX, dY, 0.0]);
        glMatrix.mat4.rotateZ(model, model, theta);
        glMatrix.mat4.rotateY(model, model, theta);
        glMatrix.mat4.multiply(model, model, rotation);
        gl.uniformMatrix4fv(uModel, false, model);

        // For transforming the normal vector
        var normalModel = glMatrix.mat3.create();
        glMatrix.mat3.normalFromMat4(normalModel, model);
        gl.uniformMatrix3fv(uNormalModel, false, normalModel);

        gl.drawElements(gl.TRIANGLES, indices.length, 
            gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
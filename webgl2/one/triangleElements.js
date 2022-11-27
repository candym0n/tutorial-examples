var canvas = document.body.appendChild(document.createElement('canvas'));
var gl = canvas.getContext('webgl2');
var vertexShader = webgl.createShader(gl,gl.VERTEX_SHADER,`
in vec4 position;
void main(){
gl_Position = position;
}
`);
var fragmentShader = webgl.createShader(gl,gl.FRAGMENT_SHADER,`
precision highp float;
uniform vec4 color;
out vec4 fragColor;
void main(){
fragColor = color;
}
`);
var program = webgl.createProgram(gl,vertexShader,fragmentShader);
gl.useProgram(program);
var positions = [
  0,0,0,
  0,0.5,0,
  0.7,0,0,
];
var indices = [
  0,1,2
];

var positionBuffer = gl.createBuffer();
webgl.setBuffer(gl,positionBuffer,gl.ARRAY_BUFFER,webgl.arrayData(positions));
var indexBuffer = gl.createBuffer();
webgl.setBuffer(gl,indexBuffer,gl.ELEMENT_ARRAY_BUFFER,webgl.indexData(indices));
webgl.addArrayDataToAttrib(gl,webgl.getFromProgram(gl,program,'position attrib'),positionBuffer,3);
gl.uniform4fv(webgl.getFromProgram(gl,program,'color uniform'),[Math.random(),Math.random(),Math.random(),1]);
function render(){
  requestAnimationFrame(render);
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
  gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
}
render();

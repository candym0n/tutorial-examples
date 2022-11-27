var webgl = {
 createShader:function(gl,type,code){
  var shader = gl.createShader(type);
  gl.shaderSource(shader,"#version 300 es\n" + code);
  gl.compileShader(shader);
  if(!gl.getShaderInfoLog(shader)){
   return shader;
  }
  else{
   console.warn("Error(s) on creating shader,\n" +
   gl.getShaderInfoLog(shader).split("ERROR").join("\n"))
  }
 },
  createProgram:function(gl,vs,fs){
  try{
   gl.getShaderInfoLog(vs)
  } catch(error){
   if(error != ""){
    console.warn("Error(s) when creating vertex shader.");
    return;
   }
  }
  try{
   gl.getShaderInfoLog(fs)
  } catch(error) {
   if(error != ""){
    console.warn("Error(s) when creating fragment shader.");
    return;
   }
  }
  var program = gl.createProgram();
  gl.attachShader(program,vs);
  gl.attachShader(program,fs);
  gl.linkProgram(program);
  return program;
 },
  getFromProgram:function(gl,program,keyWords){
  var key = keyWords.split(" ");
  if(key[1] == "attrib"){
   return gl.getAttribLocation(program,key[0]);
  } else {
   return gl.getUniformLocation(program,key[0]);
  }
 },
  arrayData:function(data){
    return new Float32Array(data)
  },
  setBuffer:function(gl,buffer,type,data,draw){
  gl.bindBuffer(type,buffer)
  gl.bufferData(type,data,draw || gl.STATIC_DRAW);
  return buffer;
 },
  addArrayDataToAttrib:function(gl,loc,buffer,count){
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(0,count,gl.FLOAT,false,0,0);
 },
  indexData:function(a){
  return new Uint16Array(a);
 }
}
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
var positionBuffer = gl.createBuffer();
webgl.setBuffer(gl,positionBuffer,gl.ARRAY_BUFFER,webgl.arrayData(positions));
webgl.addArrayDataToAttrib(gl,webgl.getFromProgram(gl,program,'position attrib'),positionBuffer,3);
gl.uniform4fv(webgl.getFromProgram(gl,program,'color uniform'),[Math.random(),Math.random(),Math.random(),1]);
function render(){
  requestAnimationFrame(render);
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES,0,3);
}
render();

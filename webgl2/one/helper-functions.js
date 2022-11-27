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

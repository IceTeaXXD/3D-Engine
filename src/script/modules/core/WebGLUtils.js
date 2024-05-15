import { WebGLTypeSetter } from "./GLTypes.js"

export function createShader(gl, source, type) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}


export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }
  return {
    program,
    uniformSetters: createUniformSetters(gl, program),
    attribSetters: createAttributSetters(gl, program)
  }
}

export function createAttribSetter(gl, info, program) {
  const loc = gl.getAttribLocation(program, info.name)
  const buf = gl.createBuffer();
    return (v) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(loc);
        gl.bufferData(gl.ARRAY_BUFFER, v.data, gl.STATIC_DRAW);
        gl.vertexAttribPointer(loc, v.size, v.dtype, v.normalize, v.stride, v.offset);
    }
}

export function createAttributSetters(gl, program) {
  const attribSetters = {}
  const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
  for (let i = 0; i < numAttribs; i++) {
    const attribInfo = gl.getActiveAttrib(program, i)
    if (!attribInfo) {
      break
    }
    attribSetters[attribInfo.name] = createAttribSetter(gl, attribInfo, program)
  }
  return attribSetters
}

export function createUniformSetter(gl, info, program) {
    const loc = gl.getUniformLocation(program, info.name)
    const isArray = (info.size > 1 && info.name.substr(-3) === '[0]');
    const type = WebGLTypeSetter[info.type];
    return (v) => {
        if (typeof v === 'object' && 'toArray' in v) v = v.toArray();
        if (isArray) {
            gl[`uniform${type}v`](loc, v);
        } else {
            if (type.substr(0, 6) === 'Matrix')
                gl[`uniform${type}`](loc, false, v);
            else {
                if (Array.isArray(v))
                    gl[`uniform${type}`](loc, ...v);
                else
                    gl[`uniform${type}`](loc, v);
            }
        }
    };
}

export function createUniformSetters(gl, program) {
  const uniformSetters = {}
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < numUniforms; i++) {
    const uniformInfo = gl.getActiveUniform(program, i)
    if (!uniformInfo) {
      break
    }
    let name = (uniformInfo.name.substr(-3) === '[0]') ? uniformInfo.name.substr(0, uniformInfo.name.length - 3) : uniformInfo.name;
    uniformSetters[name] = createUniformSetter(gl, uniformInfo, program);
  }
  return uniformSetters
}

export function setAttribute(programInfo, attributeName, data) {
  const setter = programInfo.attribSetters
  if (attributeName in setter) {
    setter[attributeName](data)
  }
}

export function setAttributes(programInfo, attributes) {
  for (const name in attributes) {
    const shaderName = `a_${name}`;
    setAttribute(programInfo, shaderName, attributes[name])
  }
}

export function setUniform(programInfo, uniformName, data) {
    const setter = programInfo.uniformSetters
    if (uniformName in setter) {
      setter[uniformName](data)
    }
}

export function setUniforms(programInfo, uniforms) {
    for (const name in uniforms) {
        const shaderName = `u_${name}`;
        setUniform(programInfo, shaderName, uniforms[name])
      }
}

export class WebGLUtils {

    createShader(gl, type, source) {
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

    createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program))
            gl.deleteProgram(program)
            return null
        }
        return program
    }

    createAttribSetter(info){
        const loc = gl.getAttribLocation(program, info.name)
        return v => gl.vertexAttribPointer(loc, info.size, info.type, info.normalize, info.stride, info.offset)
    }

    createAttributSetters(gl, program) {
        const attribSetters = {}
        const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
        for (let i = 0; i < numAttribs; i++) {
            const attribInfo = gl.getActiveAttrib(program, i)
            if (!attribInfo) {
                break
            }
            const index = gl.getAttribLocation(program, attribInfo.name)
            attribSetters[attribInfo.name] = this.createAttribSetter(gl, index)
        }
        return attribSetters
    }

    createUniformSetter(info){
        const loc = gl.getUniformLocation(program, info.name)
        return v => gl[`uniform${info.type}`](loc, v)
    }
    
    createUniformSetters(gl, program) {
        const uniformSetters = {}
        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
        for (let i = 0; i < numUniforms; i++) {
            const uniformInfo = gl.getActiveUniform(program, i)
            if (!uniformInfo) {
                break
            }
            const index = gl.getUniformLocation(program, uniformInfo.name)
            uniformSetters[uniformInfo.name] = this.createUniformSetter(gl, index, uniformInfo)
        }
        return uniformSetters
    }

    setAttribute(programInfo, attributeName, data) {
        const { gl, program, attribSetters } = programInfo
        const setter = attribSetters[attributeName]
        if (setter) {
            setter(data)
        }
    }

    setAttributes(programInfo, attributes){
        for (const name in attributes) {
            this.setAttribute(programInfo, name, attributes[name])
        }
    }

    setUniform(programInfo, uniformName, data) {
        const { gl, program, uniformSetters } = programInfo
        const setter = uniformSetters[uniformName]
        if (setter) {
            setter(data)
        }
    }

    setUniforms(programInfo, uniforms) {
        for (const name in uniforms) {
            this.setUniform(programInfo, name, uniforms[name])
        }
    }
}
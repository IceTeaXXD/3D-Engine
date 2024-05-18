export default `
attribute vec4 a_position;
attribute vec2 a_textureCoord;

uniform mat4 u_viewMatrix;
uniform mat4 u_worldMatrix;

varying highp vec2 v_textureCoord;

void main(void) {
    gl_Position = u_viewMatrix * u_worldMatrix * a_position;
    v_textureCoord = a_textureCoord;
}
`;
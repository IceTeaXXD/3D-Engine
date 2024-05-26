export default `
#define PI 3.1415926535897932384626433832795
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_textureCoord;

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform vec2 u_resolution;
uniform bool u_useVertexColor;

uniform sampler2D u_displacementTexture;
uniform float u_displacementScale;
uniform float u_displacementBias;

varying vec4 v_color;
varying vec3 v_normal, v_pos;
varying highp vec2 v_textureCoord;

void main() {
    vec3 normal = mat3(u_worldMatrix) * a_normal;
    vec4 worldPosition = u_worldMatrix * a_position;
    
    // Sample the displacement texture
    float displacementFactor = texture2D(u_displacementTexture, a_textureCoord).r;
    
    // Compute the displaced position
    vec3 displacedPosition = worldPosition.xyz + (displacementFactor * u_displacementScale + u_displacementBias) * normal;
    
    // Update the vertex position
    gl_Position = u_viewMatrix * vec4(displacedPosition, 1.0);

    v_pos = vec3(normalize(worldPosition));
    v_normal = normal;
    v_color = mix(vec4(1,1,1,1), a_color, float(u_useVertexColor));
    v_textureCoord = a_textureCoord;
}
`;
export default `
precision mediump float;

uniform float u_shininess;
uniform vec3 u_lightPosition;
uniform vec3 u_cameraPosition;
uniform vec4 u_ambient;
uniform vec4 u_diffuse;
uniform vec4 u_specular;
uniform bool u_useDiffuseTexture;
uniform sampler2D u_diffuseTexture;
uniform bool u_useSpecularTexture;
uniform sampler2D u_specularTexture;

varying vec4 v_color;
varying vec3 v_normal, v_pos;
varying highp vec2 v_textureCoord;

void main() {
    vec3 N = normalize(v_normal);
    vec3 L = normalize(normalize(u_lightPosition) - v_pos);
    vec3 H = normalize(L + normalize(u_cameraPosition));

    float kDiff = max(dot(L, N), 0.0);
    vec3 diffuseColor;

    if (u_useDiffuseTexture) {
        vec4 textureColor = texture2D(u_diffuseTexture, v_textureCoord);
        diffuseColor = kDiff * textureColor.rgb;
    } else {
        diffuseColor = kDiff * u_diffuse.rgb;
    }

    float kSpec = pow(max(dot(N, H), 0.0), u_shininess);
    vec3 specularColor;

    if (u_useSpecularTexture) {
        vec4 textureColor = texture2D(u_specularTexture, v_textureCoord);
        specularColor = kSpec * textureColor.rgb;
    } else {
        specularColor = kSpec * u_specular.rgb;
    }

    gl_FragColor = v_color * vec4(
        0.1 * u_ambient.a * u_ambient.rgb + 
        u_diffuse.a * diffuseColor +
        u_specular.a * specularColor
    , 1.0);
}
`;
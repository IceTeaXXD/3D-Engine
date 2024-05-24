export default `
precision mediump float;

uniform float u_shininess;
uniform vec3 u_lightPosition;
uniform vec3 u_cameraPosition;
uniform vec4 u_ambient;
uniform vec4 u_diffuse;
uniform vec4 u_specular;
uniform bool u_useTexture;
uniform sampler2D u_diffuseTexture;
uniform sampler2D u_specularTexture;
uniform sampler2D u_normalTexture;
uniform sampler2D u_displacementTexture;

varying vec4 v_color;
varying vec3 v_normal, v_pos;
varying highp vec2 v_textureCoord;

void main() {
    vec3 N = normalize(v_normal);
    vec3 L = normalize(normalize(u_lightPosition) - v_pos);
    vec3 H = normalize(L + normalize(u_cameraPosition));

    float kDiff = max(dot(L, N), 0.0);
    vec3 diffuseColor;

    float kSpec = pow(max(dot(N, H), 0.0), u_shininess);
    vec3 specularColor;

    vec3 displacement;

    vec3 normalColor;

    if (u_useTexture) {
        vec4 textureColor = texture2D(u_diffuseTexture, v_textureCoord);
        diffuseColor = kDiff * textureColor.rgb;

        vec4 textureColor1 = texture2D(u_specularTexture, v_textureCoord);
        specularColor = kSpec * textureColor1.rgb;
        
        vec4 textureColor2 = texture2D(u_normalTexture, v_textureCoord);
        normalColor = normalize(textureColor2.rgb * 2.0 - 1.0);
    } else {
        diffuseColor = kDiff * u_diffuse.rgb;

        specularColor = kSpec * u_specular.rgb;
    }

    gl_FragColor = v_color * vec4(
        0.1 * u_ambient.a * u_ambient.rgb + 
        u_diffuse.a * diffuseColor +
        u_specular.a * specularColor
    , 1.0);
}
`;
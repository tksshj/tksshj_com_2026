precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  vec2 centers[3];
  centers[0] = vec2(0.2, sin(uTime * 0.001) * 0.1);
  centers[1] = vec2(cos(uTime * 0.001) * 0.3, cos(uTime * 0.001) * 0.1);
  centers[2] = vec2(sin(uTime * 0.002) * -0.1, sin(uTime * 0.002) * -0.25);

  vec3 finalColor = vec3(0.8941, 0.9059, 0.9255);

  vec3 colors[3];
  colors[0] = finalColor - vec3(0.0, 0.5, 0.9);
  colors[1] = finalColor - vec3(0.01, 0.0, 0.8);
  colors[2] = finalColor - vec3(0.0, 0.2, 0.7);

  for (int i = 0; i < 3; i++) {
    float dist = length(uv - centers[i]);
    float shape = smoothstep(0.6, 0.2, dist);
    vec3 color = colors[i];
    color *= shape;
    finalColor -= color;
  }

  gl_FragColor = vec4(finalColor, 1.0);
}

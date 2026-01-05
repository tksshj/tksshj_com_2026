precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  vec2 centers[4];
  centers[0] = vec2(0.0, abs(sin(uTime * 0.00001) * 0.25) - 0.125);
  centers[1] = vec2(0.4, abs(sin(uTime * 0.00008) * 0.25) - 0.3);
  centers[2] = vec2(-0.3, abs(sin(uTime * 0.00005)) - 0.4);
  centers[3] = vec2(-0.2, abs(sin(uTime * 0.000075)) - 0.5);

  vec3 finalColor = vec3(0.8941, 0.9059, 0.9255);

  vec3 colors[4];
  colors[0] = finalColor - vec3(1.0, 0.3, 0.5);
  colors[1] = finalColor - vec3(1.0, 0.3, 0.3);
  colors[2] = finalColor - vec3(1.0, 0.3, 0.1);
  colors[3] = finalColor - vec3(1.0, 0.4, 0.7);

  for (int i = 0; i < 4; i++) {
    float angle = uTime * 0.0001 * float(i);
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    uv = rot * uv;

    float dist = length(uv - centers[i]);
    float shape = smoothstep(0.4, 0.2, dist);
    finalColor -= colors[i] * shape;
  }

  gl_FragColor = vec4(finalColor, 1.0);
}

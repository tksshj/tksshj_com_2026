varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

const float PI = 3.1415926;

void main() {
  vec2 uv = vUv - 0.5;
  float r = length(uv);          // 距離
  float a = atan(uv.y, uv.x);    // 角度（-π〜π）

  if (0.5 < length(uv)) {
    discard;
  }

  vec3 targetColor = vec3(0.2627, 0.3098, 0.4000);
  gl_FragColor = vec4(targetColor, abs(a / PI));
}

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

void main() {
  vec2 uv = vUv - 0.5;
  float r = length(uv);          // 距離
  float a = atan(uv.y, uv.x);    // 角度（-π〜π）

  if (sin(a * 24.0) * sin(uTime * 0.005) * 0.01 + 0.4 < length(uv)) {
    discard;
  }

  vec3 targetColor = vec3(0.2627, 0.3098, 0.4000);
  gl_FragColor = vec4(targetColor, 1.0);
}

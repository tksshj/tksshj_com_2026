varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float a = atan(uv.y, uv.x);
  float r = length(uv);

  vec3 mixed = vec3(0.0);
  for (float i = 0.0; i < 5.0; i++) {
    float rr = step(0.1 * i, r) * step(r, 0.1 * i + 0.05) * (r - 0.1 * i) / 0.05;
    mixed = mixed + vec3(rr);
  }

  gl_FragColor = vec4(mixed, 1.0);
}

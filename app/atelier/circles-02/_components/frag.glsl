varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float a = atan(uv.y, uv.x);
  float r = length(uv);

  float shape = clamp(0.4, 0.45, r) * 2.0;
  vec3 mixed = vec3(shape);

  gl_FragColor = vec4(mixed, 1.0);
}

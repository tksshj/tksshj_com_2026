varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float a = atan(uv.y, uv.x);
  float r = length(uv);

  vec3 mixed = vec3(0.0);
  for (float i = 0.0; i < 10.0; i++) {
    float shape = 1.0 - step(0.05 * i, r);
    mixed = mix(mixed, vec3(shape), 0.2);
  }

  gl_FragColor = vec4(mixed, 1.0);
}

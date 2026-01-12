varying vec2 vUv;

float fractSin11(float x) {
  return fract(1000.0 * sin(x));
}

float fractSin21(vec2 xy) {
  return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv - 0.5;
  vec3 color;
  if (0.0 < uv.y) {
    color = vec3(fractSin11(uv.x * 100.0));
  } else {
    color = vec3(fractSin21(uv));
  }
  gl_FragColor = vec4(color, 1.0);
}

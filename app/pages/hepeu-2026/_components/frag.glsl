precision mediump float;
varying float posZ;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) {
    discard;
  }
  float alpha = (0.9 - smoothstep(0.0, 0.8, dist * 2.0)) * 0.75 * (posZ + 6.0) * 0.1;
  vec3 baseColor = vec3(1.0, 0.975, 0.975);
  gl_FragColor = vec4(baseColor, alpha);
}

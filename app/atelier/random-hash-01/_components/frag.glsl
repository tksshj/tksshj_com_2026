uint k = 0x456789abu;
const uint UINT_MAX = 0xffffffffu;

uint uhash11(uint n) {
  n ^= (n << 1);
  n ^= (n >> 1);
  n *= k;
  n ^= (n << 1);
  return n * k;
}

float hash11(float p) {
  uint n = floatBitsToUint(p);
  return float(uhash11(n)) / float(UINT_MAX);
}

void main() {
  vec2 pos = gl_FragCoord.xy;
  vec3 fragColor = vec3(hash11(pos.x));
  gl_FragColor = vec4(fragColor, 1.0);
}

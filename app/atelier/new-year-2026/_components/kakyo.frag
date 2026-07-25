precision mediump float;

uniform float uPos;

vec2[4] diag = vec2[](
  vec2(0.70710678,0.70710678),
  vec2(-0.70710678,0.70710678),
  vec2(0.70710678,-0.70710678),
  vec2(-0.70710678,-0.70710678)
);

vec2[4] axis = vec2[](
  vec2(1, 0),
  vec2(-1, 0),
  vec2(0, 1),
  vec2(0, -1)
);

uvec3 k = uvec3(0x456789abu, 0x6789ab45u, 0x89ab4567u);
uvec3 u = uvec3(1, 2, 3);
const uint UINT_MAX = 0xffffffffu;

uvec2 uhash22(uvec2 n){
  n ^= (n.yx << u.xy);
  n ^= (n.yx >> u.xy);
  n *= k.xy;
  n ^= (n.yx << u.xy);
  return n * k.xy;
}

float gnoise21(vec2 p){
  vec2 n = floor(p);
  vec2 f = fract(p);
  float[4] v;
  for (int j = 0; j < 2; j ++){
    for (int i = 0; i < 2; i++){
      uvec2 m = floatBitsToUint(n + vec2(i, j));
      uint ind = (uhash22(m).x >> 30);
      v[i+2*j] = dot(diag[ind], f - vec2(i, j));
    }
  }
  f = f * f * f * (10.0 - 15.0 * f + 6.0 * f * f);
  return 0.5 * mix(mix(v[0], v[1], f[0]), mix(v[2], v[3], f[0]), f[1]) + 0.5;
}

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  if (length(uv) > 0.5) discard;
  gl_FragColor = vec4(0.3, 0.38, 0.54, 0.125 + 0.875 * uPos * 0.5) * length(uv);
}

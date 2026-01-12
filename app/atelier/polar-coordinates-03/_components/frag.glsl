varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

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
  vec2 uv = vUv - 0.5;

  float a = atan(uv.y, uv.x);    // 角度（-π〜π）
  float r = length(uv) * 8.0 - gnoise21(uv + cos(uTime * 0.0005)) * 4.0;

  if (0.5 < r) {
    discard;
  }

  vec3 targetColor = vec3(0.2627, 0.3098, 0.4000);
  gl_FragColor = vec4(targetColor, 1.0);
}

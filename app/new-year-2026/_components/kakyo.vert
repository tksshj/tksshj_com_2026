precision mediump float;

attribute float aIndex;

uniform float uTime;
uniform float uPos;
uniform float uGridW;
uniform float uGridH;

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


vec2 flow(vec2 p, float t) {
  float n1 = sin(p.y * 3.0 + t * 0.6);
  float n2 = cos(p.x * 3.0 - t * 0.7);

  float a = (n1 + n2) * 3.14159;

  return vec2(
    cos(a),
    sin(a)
  );
}
// index → 正方グリッド
vec3 gridFromIndex(float i) {
  float x = mod(i, uGridW);
  float y = floor(i / uGridW);

  vec2 uv = vec2(
    x / (uGridW - 1.0),
    y / (uGridH - 1.0)
  );

  return vec3(uv * 2.0 - 1.0, 0.0);
}

void main() {
  vec3 gridPos = gridFromIndex(aIndex);
  vec3 flowPos = gridPos;
  float strength = 0.2 * (1.0 - uPos);
  float noise = gnoise21(gridPos.xy * (uTime + 100.0) * 0.01);
  float seed = noise * (10.0 + uTime);
  flowPos.xy += flow(gridPos.xy * 0.1 + seed * 0.2, uTime * 0.1) * strength;
  vec3 pos = mix(flowPos * gnoise21(flowPos.xy) * 2.0, position, uPos);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 4.0 + (1.0 - uPos) * 200.0 * noise;
}

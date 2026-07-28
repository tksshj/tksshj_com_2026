uniform float uTime;
uniform vec2 uRotation;
attribute float aSpeed;
attribute float aSize;
attribute float aOffset;
varying float posZ;

vec3 rotateX(vec3 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(
    p.x,
    p.y * c - p.z * s,
    p.y * s + p.z * c
  );
}

vec3 rotateY(vec3 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(
    p.x * c + p.z * s,
    p.y,
    -p.x * s + p.z * c
  );
}

void main() {
  vec3 pos = position;

  pos.z = mod(pos.z - uTime * aSpeed * 0.8, 8.0) - 4.0;
  pos.x += sin(uTime * 0.2 + aOffset) * 0.8;
  pos.y = mod(pos.y - uTime * aSpeed * 1.5, 8.0) - 4.0;

  pos = rotateX(pos, uRotation.x);;
  pos = rotateY(pos, uRotation.y);;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  posZ = pos.z;
  gl_PointSize = aSize * 30.0;
  gl_Position = projectionMatrix * mvPosition;
}

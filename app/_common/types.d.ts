declare module 'three'

declare module '*.glsl' {
  const source: string
  export default source
}

declare module '*.vert' {
  const src: string
  export default src
}

declare module '*.frag' {
  const src: string
  export default src
}

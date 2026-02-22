/// <reference types="vite/client" />

declare module '*.css?url' {
  const css: string
  export default css
}

declare module '*.css' {
  const css: string
  export default css
}

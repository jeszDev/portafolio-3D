export type TagVariant =
  | "alpine"
  | "bootstrap"
  | "css"
  | "glsl"
  | "html"
  | "javascript"
  | "jquery"
  | "kubernetes"
  | "laravel"
  | "livewire"
  | "mysql"
  | "msyql"
  | "next"
  | "node"
  | "ogl"
  | "php"
  | "postgresql"
  | "react"
  | "redis"
  | "sqlserver"
  | "tailwind"
  | "three"
  | "typescript"
  | "vue"
  | "websockets";

export const tagLabels = {
  alpine: "Alpine.js",
  bootstrap: "Bootstrap",
  css: "CSS",
  glsl: "GLSL",
  html: "HTML",
  javascript: "JavaScript",
  jquery: "jQuery",
  kubernetes: "Kubernetes",
  laravel: "Laravel",
  livewire: "Livewire",
  mysql: "MySQL",
  msyql: "MySQL",
  next: "Next.js",
  node: "Node.js",
  ogl: "OGL.js",
  php: "PHP",
  postgresql: "PostgreSQL",
  react: "React",
  redis: "Redis",
  sqlserver: "SQL Server",
  tailwind: "Tailwind",
  three: "Three.js",
  typescript: "TypeScript",
  vue: "Vue.js",
  websockets: "WebSockets",
} as const satisfies Record<TagVariant, string>;

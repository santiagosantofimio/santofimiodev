// Logos a color de devicon (licencia MIT), servidos desde public/logos. Los que son
// negros o muy oscuros se marcan con `oscuro` para aclararlos en el modo oscuro.
export const logos = {
  html5: { archivo: "html5" },
  css3: { archivo: "css3" },
  javascript: { archivo: "javascript" },
  typescript: { archivo: "typescript" },
  react: { archivo: "react" },
  angular: { archivo: "angular" },
  astro: { archivo: "astro", oscuro: true },
  tailwindcss: { archivo: "tailwindcss" },
  vite: { archivo: "vite" },
  java: { archivo: "java" },
  spring: { archivo: "spring" },
  maven: { archivo: "maven" },
  hibernate: { archivo: "hibernate" },
  junit: { archivo: "junit" },
  lua: { archivo: "lua", oscuro: true },
  postgresql: { archivo: "postgresql" },
  docker: { archivo: "docker" },
  git: { archivo: "git" },
  github: { archivo: "github", oscuro: true },
  cloudflare: { archivo: "cloudflare" },
  netlify: { archivo: "netlify" },
} satisfies Record<string, { archivo: string; oscuro?: boolean }>;

export type Logo = keyof typeof logos;

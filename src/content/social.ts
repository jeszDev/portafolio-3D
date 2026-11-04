export const social = [
  { url: "mailto:jjcr.dev@gmail.com", name: "mail" },
  { url: "https://github.com/jeszDev", name: "github" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];

import type { ProjectContent } from "../../types";

export default {
  title: "ACCEIUS – Enterprise Case Management System",
  theme: "dark",
  tags: ["laravel", "php", "sqlserver", "livewire", "alpine", "bootstrap"],
  live: "https://acceius.fiscaliamichoacan.gob.mx/login",
  description:
    "Core enterprise system for the State Attorney General's Office digitalizing and unifying legal and administrative law enforcement workflows.<br/><br/>Live production platform with login restricted to authorized institutional personnel. Delivers complete traceability from initial complaint reception to police investigation proceedings and legal case files.",
  components: [
    {
      type: "list",
      props: {
        title: "Engineered Modules",
        size: "md",
        items: [
          "<b>Digital Guidance:</b> Initial classification and intelligent complaint dispatch.",
          "<b>Case File Direction:</b> Centralized case management and investigator assignment.",
          "<b>Public Prosecutor Portal:</b> Specialized workspace for prosecutors and legal agents.",
          "<b>Police Investigation Direction:</b> Oversight and dispatch of investigation orders.",
          "<b>Investigation Officers:</b> Field reports, investigation logs, and evidentiary action tracking.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Tech Stack & Enterprise Capabilities",
        size: "md",
        items: [
          "Robust <b>Laravel</b> stack paired with <b>Livewire</b> and <b>Alpine.js</b> for real-time reactivity without page reloads.",
          "Enterprise relational database in <b>SQL Server</b> managing high-concurrency multi-role legal operations.",
          "Strict Role-Based Access Control (RBAC) security model protecting highly confidential legal data.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

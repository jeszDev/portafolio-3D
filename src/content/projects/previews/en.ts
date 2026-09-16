import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.webp";
import thumbnailStreakon from "../../../assets/thumbnails/streakon.webp";
import thumbnailAcceius from "../../../assets/thumbnails/acceius.png";
import thumbnailCadenaCustodia from "../../../assets/thumbnails/cadena-custodia.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Clinical Practice Management System",
    slug: "consultorio-medico",
    thumbnail: thumbnailStreakon,
    description: "Clinical platform for patient medical records, appointments, and consultation traceability",
    tags: ["Laravel", "Vue.js", "TypeScript", "SQL"],
  },
  {
    title: "Online Complaint Intake 2.0 (FGE)",
    slug: "denuncia-en-linea",
    thumbnail: thumbnailCubeWar,
    description: "Institutional platform for citizen reports, official identity validation (RENAPO), and case intake",
    tags: ["Laravel", "Livewire", "RENAPO API", "SQL Server"],
  },
  {
    title: "ACCEIUS - Legal Case Management (FGE)",
    slug: "acceius",
    thumbnail: thumbnailAcceius,
    description: "Comprehensive platform for judicial workflows, criminal investigations, and case files",
    tags: ["Laravel", "Livewire", "SQL Server", "Multi-role"],
  },
  {
    title: "Chain of Custody & Evidence System (FGE)",
    slug: "cadena-custodia",
    thumbnail: thumbnailCadenaCustodia,
    description: "Digital platform for forensic evidence tracking, custody logs, and official document generation",
    tags: ["Laravel", "jQuery", "SQL Server"],
  },
] as const satisfies ProjectPreview[];

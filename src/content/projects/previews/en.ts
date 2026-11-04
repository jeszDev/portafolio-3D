import thumbnailAcceius from "../../../assets/thumbnails/acceius.png";
import thumbnailChainOfCustody from "../../../assets/thumbnails/chain-of-custody.png";
import thumbnailLatidos from "../../../assets/thumbnails/latidos.png";
import thumbnailOnlineComplaint from "../../../assets/thumbnails/online-complaint.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Latidos - Medical Practice Management System",
    slug: "latidos",
    thumbnail: thumbnailLatidos,
    description: "Clinical platform for patient medical records, appointments, and consultation traceability",
    tags: ["laravel", "vue", "typescript", "mysql",  "tailwind"],
  },
  {
    title: "Online Complaint Intake 2.0 (FGE)",
    slug: "online-complaints",
    thumbnail: thumbnailOnlineComplaint,
    description: "Institutional platform for citizen reports, official identity validation (RENAPO), and case intake",
    tags: ["laravel", "php", "javascript", "bootstrap", "sqlserver"],
  },
  {
    title: "ACCEIUS - Legal Case Management (FGE)",
    slug: "acceius",
    thumbnail: thumbnailAcceius,
    description: "Comprehensive platform for judicial workflows, criminal investigations, and case files",
    tags: ["laravel", "php", "livewire", "alpine", "bootstrap", "sqlserver"],
  },
  {
    title: "Chain of Custody Evidence System (FGE)",
    slug: "chain-of-custody",
    thumbnail: thumbnailChainOfCustody,
    description: "Digital platform for forensic evidence tracking, custody logs, and official document generation",
    tags: ["laravel", "php", "jquery", "bootstrap", "sqlserver"],
  },
] as const satisfies ProjectPreview[];

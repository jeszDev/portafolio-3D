import thumbnailOnlineComplaint from "../../../assets/thumbnails/online-complaint.png";
import thumbnailStreakon from "../../../assets/thumbnails/streakon.webp";
import thumbnailAcceius from "../../../assets/thumbnails/acceius.png";
import thumbnailChainOfCustody from "../../../assets/thumbnails/chain-of-custody.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Medical Practice Management System",
    slug: "medical-practice",
    thumbnail: thumbnailStreakon,
    description: "Clinical platform for patient medical records, appointments, and consultation traceability",
    tags: ["Laravel", "Vue.js", "TypeScript", "SQL"],
  },
  {
    title: "Online Complaint Intake 2.0 (FGE)",
    slug: "online-complaints",
    thumbnail: thumbnailOnlineComplaint,
    description: "Institutional platform for citizen reports, official identity validation (RENAPO), and case intake",
    tags: ["Laravel", "JavaScript", "RENAPO API", "MySQL"],
  },
  {
    title: "ACCEIUS - Legal Case Management (FGE)",
    slug: "acceius",
    thumbnail: thumbnailAcceius,
    description: "Comprehensive platform for judicial workflows, criminal investigations, and case files",
    tags: ["Laravel", "Livewire", "SQL Server", "Multi-role"],
  },
  {
    title: "Chain of Custody Evidence System (FGE)",
    slug: "chain-of-custody",
    thumbnail: thumbnailChainOfCustody,
    description: "Digital platform for forensic evidence tracking, custody logs, and official document generation",
    tags: ["Laravel", "jQuery", "MySQL"],
  },
] as const satisfies ProjectPreview[];

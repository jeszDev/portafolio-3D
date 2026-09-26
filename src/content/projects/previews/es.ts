import thumbnailOnlineComplaint from "../../../assets/thumbnails/online-complaint.png";
import thumbnailStreakon from "../../../assets/thumbnails/streakon.webp";
import thumbnailAcceius from "../../../assets/thumbnails/acceius.png";
import thumbnailChainOfCustody from "../../../assets/thumbnails/chain-of-custody.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Gestión de Consultorio Médico",
    slug: "medical-practice",
    thumbnail: thumbnailStreakon,
    description: "Plataforma clínica para historial médico, citas y trazabilidad de consultas",
    tags: ["Laravel", "Vue.js", "TypeScript", "SQL"],
  },
  {
    title: "Denuncia en Línea 2.0 (Fiscalía)",
    slug: "online-complaints",
    thumbnail: thumbnailOnlineComplaint,
    description: "Sistema institucional para recepción, validación (RENAPO) y registro de denuncias",
    tags: ["Laravel", "JavaScript", "API RENAPO", "MySQL"],
  },
  {
    title: "ACCEIUS - Gestión Institucional (Fiscalía)",
    slug: "acceius",
    thumbnail: thumbnailAcceius,
    description: "Plataforma integral de trazabilidad jurídica y carpetas de investigación",
    tags: ["Laravel", "Livewire", "SQL Server", "Multirol"],
  },
  {
    title: "Sistema de Cadena de Custodia (Fiscalía)",
    slug: "chain-of-custody",
    thumbnail: thumbnailChainOfCustody,
    description: "Control digital, resguardo y trazabilidad forense de indicios y evidencias",
    tags: ["Laravel", "jQuery", "MySQL"],
  },
] as const satisfies ProjectPreview[];

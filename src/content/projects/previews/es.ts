import thumbnailOnlineComplaint from "../../../assets/thumbnails/online-complaint.png";
import thumbnailLatidos from "../../../assets/thumbnails/latidos.png";
import thumbnailAcceius from "../../../assets/thumbnails/acceius.png";
import thumbnailChainOfCustody from "../../../assets/thumbnails/chain-of-custody.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Latidos - Gestión de Consultorio Médico",
    slug: "medical-practice",
    thumbnail: thumbnailLatidos,
    description: "Plataforma clínica para historial médico, citas y trazabilidad de consultas",
    tags: ["laravel", "vue", "typescript", "mysql", "tailwind"],
  },
  {
    title: "Denuncia en Línea 2.0 (Fiscalía)",
    slug: "online-complaints",
    thumbnail: thumbnailOnlineComplaint,
    description: "Sistema institucional para recepción, validación (RENAPO) y registro de denuncias",
    tags: ["laravel", "php", "javascript", "bootstrap", "sqlserver"],
  },
  {
    title: "ACCEIUS - Gestión Institucional (Fiscalía)",
    slug: "acceius",
    thumbnail: thumbnailAcceius,
    description: "Plataforma integral de trazabilidad jurídica y carpetas de investigación",
    tags: ["laravel", "php", "livewire", "alpine", "bootstrap", "sqlserver"],
  },
  {
    title: "Sistema de Cadena de Custodia (Fiscalía)",
    slug: "chain-of-custody",
    thumbnail: thumbnailChainOfCustody,
    description: "Control digital, resguardo y trazabilidad forense de indicios y evidencias",
    tags: ["laravel", "php", "jquery", "bootstrap", "sqlserver"],
  },
] as const satisfies ProjectPreview[];

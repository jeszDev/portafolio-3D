import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.webp";
import thumbnailStreakon from "../../../assets/thumbnails/streakon.webp";
import thumbnailAcceius from "../../../assets/thumbnails/acceius.png";
import thumbnailCadenaCustodia from "../../../assets/thumbnails/cadena-custodia.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Gestión de Consultorio Médico",
    slug: "consultorio-medico",
    thumbnail: thumbnailStreakon,
    description: "Plataforma clínica para historial médico, citas y trazabilidad de consultas",
    tags: ["Laravel", "Vue.js", "TypeScript", "SQL"],
  },
  {
    title: "Denuncia en Línea 2.0 (Fiscalía)",
    slug: "denuncia-en-linea",
    thumbnail: thumbnailCubeWar,
    description: "Sistema institucional para recepción, validación (RENAPO) y registro de denuncias",
    tags: ["Laravel", "Livewire", "API RENAPO", "SQL Server"],
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
    slug: "cadena-custodia",
    thumbnail: thumbnailCadenaCustodia,
    description: "Control digital, resguardo y trazabilidad forense de indicios y evidencias",
    tags: ["Laravel", "jQuery", "SQL Server"],
  },
] as const satisfies ProjectPreview[];

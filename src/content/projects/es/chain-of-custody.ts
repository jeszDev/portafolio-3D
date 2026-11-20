import type { ProjectContent } from "../../types";

export default {
  title: "Sistema de Cadena de Custodia",
  theme: "dark",
  tags: ["laravel", "php", "mysql", "jquery", "bootstrap"],
  demo: { status: "coming-soon" },
  live: "https://bodega.fiscaliamichoacan.gob.mx/login",
  description:
    "Plataforma web para la digitalización, control y trazabilidad completa de indicios y evidencias físicas en bodega bajo estrictos protocolos normativos de cadena de custodia.<br/><br/>Sistema en producción institucuional (acceso restringido a personal autorizado) que sustituye los registros manuales por una plataforma auditable.",
  components: [
    {
      type: "list",
      props: {
        title: "Funcionalidades Principales",
        size: "md",
        items: [
          "<b>Registro de Cadena de Custodia:</b> Captura digital detallada de evidencias, embalaje y procedencia.",
          "<b>Control de Préstamos y Bajas:</b> Trazabilidad de salida para peritajes, audiencias judiciales o destino final.",
          "<b>Generación Automática de Documentos:</b> Emisión instantánea de formatos oficiales y actas de entrega-recepción.",
          "<b>Indicadores Operativos:</b> Tableros de control con métricas de evidencias en resguardo, préstamos activos e inventario.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Valor e Impacto",
        size: "md",
        items: [
          "Digitalización total de la cadena de custodia eliminando inconsistencias en registros manuales.",
          "Implementado con <b>Laravel</b>, <b>MySQL</b>, <b>jQuery</b> y <b>Bootstrap</b> para una gestión rápida y auditable.",
          "Trazabilidad de resguardo a largo plazo con auditoría de movimientos por usuario.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

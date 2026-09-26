import type { ProjectContent } from "../../types";

export default {
  title: "ACCEIUS – Sistema Integral de Gestión Institucional",
  theme: "dark",
  tags: ["laravel", "php", "sqlserver", "livewire", "alpine", "bootstrap"],
  live: "https://acceius.fiscaliamichoacan.gob.mx/login",
  description:
    "Sistema neurálgico e institucional de la Fiscalía General del Estado de Michoacán que digitaliza e integra todos los procesos legales y administrativos.<br/><br/>Plataforma en producción con acceso restringido a personal institucional. Proporciona trazabilidad completa desde la recepción inicial de la denuncia hasta la integración de carpetas de investigación y actos policiales.",
  components: [
    {
      type: "list",
      props: {
        title: "Módulos Desarrollados",
        size: "md",
        items: [
          "<b>Orientador Digital:</b> Clasificación primaria y canalización inteligente de denuncias.",
          "<b>Director de Carpetas:</b> Gestión centralizada y asignación de carpetas de investigación.",
          "<b>Ministerio Público:</b> Interfaz especializada para fiscales y agentes del Ministerio Público.",
          "<b>Director de Policía de Investigación:</b> Supervisión y asignación de órdenes de investigación.",
          "<b>Policía de Investigación:</b> Control de actos de investigación, informes policiales y diligencias de campo.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Stack y Capacidades Técnicas",
        size: "md",
        items: [
          "Arquitectura robusta en <b>Laravel</b> con <b>Livewire</b> y <b>Alpine.js</b> para reactividad en tiempo real sin recarga de página.",
          "Base de datos relacional corporativa en <b>SQL Server</b> gestionando alto volumen de información sensible y concurrencia multirol.",
          "Sistema estricto de permisos y control de acceso basado en roles (RBAC) para seguridad de la información.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

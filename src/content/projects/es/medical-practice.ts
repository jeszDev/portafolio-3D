import type { ProjectContent } from "../../types";

export default {
  title: "Sistema de Gestión de Consultorio Médico",
  theme: "dark",
  tags: ["laravel", "vue", "typescript", "mysql"],
  description:
    "Plataforma web Full Stack para la gestión clínica integral y trazabilidad de consultas médicas.<br/><br/>Desarrollada bajo una arquitectura desacoplada con Laravel en el Backend (API REST) y Vue.js en el Frontend, optimizando la atención de pacientes y el control de expedientes.",
  components: [
    {
      type: "list",
      props: {
        title: "Funcionalidades Clave",
        size: "md",
        items: [
          "<b>Historial Clínico Digital:</b> Registro estructurado de antecedentes, diagnósticos y trazabilidad de consultas previas.",
          "<b>Gestión de Citas:</b> Programación y control de agenda médica con estado de próximas consultas.",
          "<b>Estudios e Imágenes Médicas:</b> Módulo para carga, resguardo y visualización de expedientes médicos.",
          "<b>Portal del Paciente:</b> Módulo exclusivo para que los pacientes accedan a su historial e indicaciones médicas.",
          "<b>Notificaciones Automáticas:</b> Recordatorios para confirmación, reprogramación o cancelación de citas.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Arquitectura y Enfoque Técnico",
        size: "md",
        items: [
          "Backend en <b>Laravel</b> estructurado como API REST escalable con validación estricta de datos.",
          "Frontend reactivo construido con <b>Vue.js</b> y <b>TypeScript</b> para garantizar tipado fuerte y experiencia de usuario fluida.",
          "Base de datos relacional <b>MySQL</b> optimizada para consultas de historial y agendas complejas.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

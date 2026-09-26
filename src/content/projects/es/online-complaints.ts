import type { ProjectContent } from "../../types";

export default {
  title: "Denuncia en Línea 2.0",
  theme: "dark",
  tags: ["laravel", "php", "mysql", "javascript", "bootstrap"],
  live: "https://fiscaliamichoacan.gob.mx/denuncia/",
  description:
    "Aplicación web institucional de la Fiscalía General del Estado para la recepción, clasificación y gestión de denuncias ciudadanas de manera digital y segura.<br/><br/>Plataforma en producción abierta al público que permite a los ciudadanos realizar denuncias en línea, reduciendo tiempos de espera y automatizando la canalización de casos.",
  components: [
    {
      type: "list",
      props: {
        title: "Características Destacadas",
        size: "md",
        items: [
          "<b>Validación OTP de Correo:</b> Verificación de identidad mediante envío de códigos de seguridad por email.",
          "<b>Integración API RENAPO:</b> Obtención y validación automática de datos ciudadanos a través de la CURP.",
          "<b>Formularios Dinámicos:</b> Registro estructurado adaptativo según la tipología del delito.",
          "<b>Carga Ilimitada de Evidencias:</b> Adjunto seguro de archivos, imágenes y documentos probatorios.",
          "<b>Integración Institucional:</b> Conexión automática con el ecosistema ACCEIUS para seguimiento fiscal.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Arquitectura y Seguridad",
        size: "md",
        items: [
          "Desarrollado en <b>Laravel / PHP</b> con enfoque en seguridad informática y protección de datos confidenciales.",
          "Consumo de servicios web gubernamentales en tiempo real (API REST de RENAPO).",
          "Interfaz responsive con <b>Bootstrap</b> y <b>JavaScript</b> orientada a facilitar la usabilidad ciudadana.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

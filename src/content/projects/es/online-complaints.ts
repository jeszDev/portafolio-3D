import type { ProjectContent } from "../../types";

export default {
  title: "Denuncia en Línea 2.0",
  theme: "dark",
  tags: ["laravel", "php", "mysql", "javascript", "bootstrap"],
  live: "https://fiscaliamichoacan.gob.mx/denuncia",
  description:
    "Aplicación web institucional orientada a la recepción, clasificación y gestión de denuncias ciudadanas.<br/><br/>Incorpora validación de correo electrónico mediante código OTP, integración en tiempo real con la API de RENAPO para la obtención automática de datos por CURP, formularios dinámicos estructurados, carga ilimitada de evidencias e integración directa con el ecosistema ACCEIUS.",
  components: [],
} as const satisfies ProjectContent;

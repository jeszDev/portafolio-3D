import type { ProjectContent } from "../../types";

export default {
  title: "Online Complaints Platform 2.0",
  theme: "dark",
  tags: ["laravel", "php", "mysql", "javascript", "bootstrap"],
  live: "https://fiscaliamichoacan.gob.mx/denuncia",
  description:
    "Institutional web application designed for receiving, classifying, and processing citizen criminal complaints.<br/><br/>Includes OTP email verification, real-time integration with RENAPO API for identity lookup by CURP, structured dynamic forms, unlimited evidence file uploads, and seamless integration with the ACCEIUS institutional platform.",
  components: [],
} as const satisfies ProjectContent;

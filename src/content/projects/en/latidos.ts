import type { ProjectContent } from "../../types";

export default {
  title: "Latidos",
  theme: "dark",
  tags: ["laravel", "vue", "typescript", "mysql"],
  demo: { status: "coming-soon" },
  description:
    "Full Stack web platform for comprehensive clinical management and medical consultation traceability.<br/><br/>Architected using a decoupled API REST with Laravel on the Backend and Vue.js on the Frontend, streamlining patient care and medical record tracking.",
  components: [
    {
      type: "list",
      props: {
        title: "Key Features",
        size: "md",
        items: [
          "<b>Digital Health Records:</b> Structured tracking of medical history, diagnoses, and consultation logs.",
          "<b>Appointment Management:</b> Medical schedule management with real-time status of upcoming visits.",
          "<b>Medical Imaging & Lab Studies:</b> Upload, secure storage, and visualization of medical files.",
          "<b>Patient Portal:</b> Dedicated module enabling patients to access their history and prescriptions.",
          "<b>Automated Notifications:</b> Automated reminders for appointment confirmation, rescheduling, or cancellation.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Architecture & Technical Highlights",
        size: "md",
        items: [
          "Backend API built with <b>Laravel</b> engineered for scalability and strict data validation.",
          "Reactive single-page application (SPA) with <b>Vue.js</b> and <b>TypeScript</b> ensuring type safety and smooth UX.",
          "Relational database design in <b>MySQL</b> optimized for complex scheduling queries.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

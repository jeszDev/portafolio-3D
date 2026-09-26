import type { ProjectContent } from "../../types";

export default {
  title: "Chain of Custody Evidence System",
  theme: "dark",
  tags: ["laravel", "php", "mysql", "jquery", "bootstrap"],
  live: "https://bodega.fiscaliamichoacan.gob.mx/login",
  description:
    "Web platform dedicated to digital recording, control, and full forensic traceability of physical evidence within evidence storage under official chain of custody protocols.<br/><br/>Live institutional system (login restricted to authorized personnel) replacing paper registries with an auditable platform.",
  components: [
    {
      type: "list",
      props: {
        title: "Core Functionalities",
        size: "md",
        items: [
          "<b>Evidence Custody Registration:</b> Detailed digital logging of evidence, packaging, and origins.",
          "<b>Loan & Disposition Tracking:</b> Traceability of evidence checkouts for forensic analysis, court hearings, or final disposal.",
          "<b>Automated Document Generation:</b> Instant generation of official chain of custody forms and handoff receipts.",
          "<b>Operational Dashboard Metrics:</b> Real-time indicators of evidence inventory, active loans, and status logs.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Impact & Technology",
        size: "md",
        items: [
          "Complete digitalization of evidence lifecycle, eliminating manual logging errors.",
          "Engineered with <b>Laravel</b>, <b>MySQL</b>, <b>jQuery</b>, and <b>Bootstrap</b> for high-reliability auditing.",
          "Long-term evidence tracking with comprehensive per-user action audit logs.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

import type { ProjectContent } from "../../types";

export default {
  title: "Online Complaints Platform 2.0",
  theme: "dark",
  tags: ["laravel", "php", "mysql", "javascript", "bootstrap"],
  live: "https://fiscaliamichoacan.gob.mx/denuncia/",
  description:
    "Institutional web application for the State Attorney General's Office designed for secure intake, classification, and processing of citizen criminal reports.<br/><br/>Live production portal enabling citizens across the state to file online complaints, reducing queue times and automating case dispatch.",
  components: [
    {
      type: "list",
      props: {
        title: "Key Highlights",
        size: "md",
        items: [
          "<b>OTP Email Verification:</b> Identity verification via secure one-time passcode emails.",
          "<b>RENAPO API Integration:</b> Automated citizen identity retrieval and validation via CURP.",
          "<b>Dynamic Forms:</b> Adaptive structured data entry tailored to specific crime categories.",
          "<b>Unlimited Evidence Attachment:</b> Secure upload of digital evidence, documents, and media.",
          "<b>Ecosystem Integration:</b> Direct integration with ACCEIUS platform for legal case processing.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Architecture & Security",
        size: "md",
        items: [
          "Built on <b>Laravel / PHP</b> adhering to strict cybersecurity standards for confidential data protection.",
          "Real-time consumption of federal web services (RENAPO REST API).",
          "Responsive citizen-centric UI built with <b>Bootstrap</b> and <b>JavaScript</b>.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;

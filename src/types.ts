export interface ChatMessage {
  id: string;
  sender: "user" | "sofia";
  text: string;
  timestamp: string;
}

export interface AssistantResponse {
  reply: string;
  suggestions: string[];
  userIntent: string;
  detectedLanguage: string;
}

export interface AssessmentForm {
  fullName: string;
  phoneNumber: string;
  targetCountry: "USA" | "Canadá" | "";
  visaType: "Turismo" | "Trabajo" | "";
  hasPreviousRefusal: "Sí" | "No" | "";
  hasStableJobOrBusiness: "Sí" | "No" | "";
  hasAssetsOrFamilyTies: "Sí" | "No" | "";
  address?: string;
  experience?: string;
  jobType?: string;
  educationLevel?: string;
}

export interface VisaStep {
  number: number;
  title: string;
  description: string;
  details: string[];
  cta: string;
}

export interface ServiceIncluded {
  title: string;
  description: string;
  included: boolean;
}

export const VISA_STEPS: VisaStep[] = [
  {
    number: 1,
    title: "Evaluación Gratis",
    description: "Analizamos tu perfil laboral, financiero y familiar antes de que gastes un solo quetzal.",
    details: [
      "Revisión de historial de viajes",
      "Diagnóstico de arraigo y estabilidad",
      "Detección de puntos débiles a corregir"
    ],
    cta: "Iniciar Evaluación"
  },
  {
    number: 2,
    title: "Llenado Oficial",
    description: "Completamos los complejos formularios de la embajada (DS-160 o IMM 5257) de forma estratégica.",
    details: [
      "Traducción y redacción profesional",
      "Carga correcta de datos laborales",
      "Minimizamos rechazos por errores tipográficos"
    ],
    cta: "Ver Formularios"
  },
  {
    number: 3,
    title: "Simulacro y Entrevista",
    description: "Te entrenamos con preguntas reales de los cónsules para que vayas con máxima tranquilidad.",
    details: [
      "Simulación presencial/virtual uno a uno",
      "Revisión de lenguaje corporal y respuestas clave",
      "Preparación de carpeta física de documentos"
    ],
    cta: "Reservar Simulacro"
  },
  {
    number: 4,
    title: "Cita Consular",
    description: "Sales de nuestra oficina cruzando la calle directamente a tu entrevista en la Embajada de USA.",
    details: [
      "Expediente completamente ordenado y foliado",
      "Casillero seguro para guardar tu celular y llaves",
      "Nuestros asesores te esperan afuera con un abrazo"
    ],
    cta: "Listo para Viajar"
  }
];

export const SERVICES_INCLUDED: ServiceIncluded[] = [
  {
    title: "Análisis Personalizado del Perfil",
    description: "Buscamos el mejor camino legal adecuado a tu realidad en Guatemala.",
    included: true
  },
  {
    title: "Llenado Estratégico de Formularios",
    description: "Completado profesional de formularios consulares DS-160 (USA) o IMM 5257 (Canadá).",
    included: true
  },
  {
    title: "Simulacros de Entrevista Consular",
    description: "Prácticas interactivas con preguntas basadas en el perfil que verá el cónsul.",
    included: true
  },
  {
    title: "Casillero y Bodega de Pertenencias",
    description: "Guarda tu teléfono y bolsas de forma segura mientras entras a la embajada.",
    included: true
  },
  {
    title: "Seguimiento Continuo del Trámite",
    description: "Monitoreo constante del estado de cita y pasaporte de principio a fin.",
    included: true
  },
  {
    title: "Tasas de Solicitud de la Embajada / Visa Fe",
    description: "El arancel consular oficial que cobra la embajada directamente ($185 USD aprox).",
    included: false
  }
];

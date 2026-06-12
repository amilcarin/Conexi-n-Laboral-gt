import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini SDK securely using backend environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON body parser
  app.use(express.json());

  // API: Sofia Chatbot Route
  app.post("/api/assistant", async (req, res) => {
    try {
      const { message, history } = req.body;
      const userMessage = message || "";
      const pastHistory = Array.isArray(history) ? history : [];

      // Format past interactions to help Sofía remember context (query history)
      const formattedHistoryPart = pastHistory
        .map((h: { sender: string; text: string }) => `${h.sender === "user" ? "Usuario" : "Sofía"}: ${h.text}`)
        .join("\n");

      const systemInstruction = `
Eres Sofía, la asesora virtual experta de "Conexión Laboral" en Guatemala, una agencia líder en asesoría migratoria para Visas de Estados Unidos y Canadá.
Tu objetivo es guiar al usuario de forma muy profesional pero cercana, amable, empática y orientada a la conversión (agendar su cita gratuita o contactar por WhatsApp).

INFORMACIÓN CLAVE DEL SERVICIO (Deberás mencionarla si es relevante):
1. Nombre de la empresa: Conexión Laboral.
2. Dirección física: Boulevard Austriaco, zona 16, Ciudad de Guatemala (justo frente a la Embajada de Estados Unidos). Contamos con parqueo seguro.
3. Modalidad: Atendemos presencialmente en oficina y también de manera 100% virtual por videollamada para personas del interior de Guatemala.
4. Horario: Lunes a Viernes de 8:00 AM a 5:00 PM, y Sábados de 8:00 AM a 12:00 PM.
5. Inversión total: Q.1,850.00 (Quetzales guatemaltecos). Es un pago único. No incluye el impuesto o tasa consular de la Embajada.
6. ¿Qué incluye la inversión de Q.1,850?
   - Análisis personalizado del perfil del solicitante.
   - Llenado profesional y estratégico de formularios oficiales (DS-160 para USA o IMM 5257 para Canadá).
   - Preparación avanzada y simulacro personalizado para la entrevista consular.
   - Seguimiento integral del caso de principio a fin.
7. Nuestra filosofía de atención: Nos gusta la atención cálida pero firme. Usa frases de confianza natural de Guatemala como "Con gusto le apoyamos", "Mire, le explico...", o "Estamos para servirle".

REGLAS DE INTERACCIÓN:
- Sé multilingüe: Responde siempre en el mismo idioma en el que te escribe el usuario. Si escribe en inglés, responde en inglés; si escribe en español, en español.
- NO seas estricta con la ortografía o gramática del usuario. Capta la idea general y responde con amabilidad, respondiendo puntualmente a lo que necesita.
- Mantente simpática y resolutiva. Nunca uses términos excesivamente técnicos o robóticos.
- Proporcione siempre 2 o 3 sugerencias contextuales de respuestas rápidas que el usuario podría presionar a continuación (deben ser cortas, p.ej. "¿Cuánto cuesta?", "¿Dónde quedan?", "Comenzar perfil gratis", "Hablar con un humano por WhatsApp").
`;

      const prompt = `
Historial de conversación anterior:
${formattedHistoryPart}

Último mensaje recibido del Usuario:
"${userMessage}"

Por favor responde a este mensaje de manera cercana, empatizando con el usuario y guiándolo sutilmente a iniciar su evaluación gratuita de perfil para visa de USA o Canadá en Conexión Laboral.
`;

      // Define structured response to ensure we always get clean JSON with suggestion prompts
      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description: "La respuesta textual de Sofía. Mantén un tono cálido, carismático y guatemalteco (usa expresiones de servicio si es en español).",
              },
              suggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "Lista de exactamente 2 o 3 botones de sugerencias muy cortos (mensajes de seguimiento que el usuario podría querer pulsar, de no más de 30 caracteres cada uno) adaptados al momento actual de la charla.",
              },
              userIntent: {
                type: Type.STRING,
                description: "Intención detectada (ej. saludo, duda_precio, duda_requisitos, cita_embajada, ubicacion, desconocido).",
              },
              detectedLanguage: {
                type: Type.STRING,
                description: "Idioma detectado (ej. 'es', 'en').",
              },
            },
            required: ["reply", "suggestions", "userIntent", "detectedLanguage"],
          },
        },
      });

      const responseText = result.text || "";
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (err) {
        // Fallback in case JSON is somehow invalid
        responseData = {
          reply: "¡Hola! Con gusto le apoyo. ¿Le gustaría realizar una evaluación de perfil 100% gratuita para su visa de Estados Unidos o Canadá hoy mismo?",
          suggestions: ["¿Cuánto cuesta?", "¿Dónde están ubicados?", "Agendar cita por WhatsApp"],
          userIntent: "desconocido",
          detectedLanguage: "es"
        };
      }

      res.json(responseData);
    } catch (error: any) {
      console.error("Sofía API Error:", error);
      res.status(500).json({
        reply: "Disculpe el inconveniente, en este momento estoy ordenando mis notas consulares. ¿Le gustaría que le contacte directamente con un asesor por WhatsApp para atenderle de inmediato?",
        suggestions: ["Hablar por WhatsApp", "Ver precios del trámite"],
        userIntent: "error",
        detectedLanguage: "es"
      });
    }
  });

  // Serve static files and SPA route support
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import { useState, useEffect, useRef } from "react";
import { ChatMessage, AssistantResponse } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  ChevronDown, 
  Smartphone, 
  MapPin, 
  Users, 
  User, 
  Clock,
  History,
  Languages,
  CheckCircle,
  HelpCircle,
  MessageCircle
} from "lucide-react";
const sofiaAvatar = "/src/assets/images/sofia_avatar_1781236440185.jpg";

export default function SofiaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "¿Cuánto cuesta la asesoría?",
    "¿Dónde están ubicados?",
    "¿Cuáles son los requisitos?",
    "Quiero agendar evaluación gratis",
  ]);
  const [userName, setUserName] = useState<string>("");
  const [lastIntent, setLastIntent] = useState<string>("");
  const [detectedLang, setDetectedLang] = useState<string>("es");
  const [consultationHistory, setConsultationHistory] = useState<string[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load chat session history and stats from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("sofia_chat_messages");
    const savedUserName = localStorage.getItem("cl_user_name");
    const savedIntent = localStorage.getItem("sofia_last_intent");
    const savedLang = localStorage.getItem("sofia_detected_lang");
    const savedHistory = localStorage.getItem("sofia_consultation_history");

    if (savedUserName) setUserName(savedUserName);
    if (savedIntent) setLastIntent(savedIntent);
    if (savedLang) setDetectedLang(savedLang);
    if (savedHistory) {
      try {
        setConsultationHistory(JSON.parse(savedHistory));
      } catch (e) {
        setConsultationHistory([]);
      }
    }

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        initializeDefaultGreeting(savedUserName || "");
      }
    } else {
      initializeDefaultGreeting(savedUserName || "");
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("sofia_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when chat opens or new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const initializeDefaultGreeting = (userObjName: string) => {
    const isEn = detectedLang === "en";
    let greetingText = "";
    
    if (userObjName) {
      greetingText = `¡Hola de nuevo, ${userObjName}! Qué alegre volver a saludarte. 😊 Estábamos conversando sobre tu asesoría migratoria para tu Visa. ¿Hay algún detalle adicional que te gustaría ver hoy, o estás listo para agendar la cita en nuestra oficina de Zona 16?`;
    } else {
      greetingText = "¡Hola! Soy Sofía, tu asesora virtual experta en Visas para Estados Unidos y Canadá de Conexión Laboral. 🇬🇹✨ Aquí te acompañamos paso a paso con calidez y profesionalismo para que viajes legal y seguro.\n\n¿De qué te gustaría informarte o tienes dudas sobre el proceso?";
    }

    setMessages([
      {
        id: "greet-1",
        sender: "sofia",
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const saveConsultationKeyword = (text: string) => {
    // Extract key concepts or queries to maintain historical context for personalization
    let concept = "";
    const lowercase = text.toLowerCase();
    if (lowercase.includes("precio") || lowercase.includes("cuánto") || lowercase.includes("costo") || lowercase.includes("pagar")) {
      concept = "Precios y Formas de Pago";
    } else if (lowercase.includes("donde") || lowercase.includes("ubicacion") || lowercase.includes("dirección") || lowercase.includes("oficina")) {
      concept = "Ubicación en Zona 16 (frente a Embajada)";
    } else if (lowercase.includes("requisito") || lowercase.includes("necesito") || lowercase.includes("papel")) {
      concept = "Requisitos Generales";
    } else if (lowercase.includes("tiempo") || lowercase.includes("demora") || lowercase.includes("tarda")) {
      concept = "Tiempos del Trámite";
    } else if (lowercase.includes("turismo") || lowercase.includes("pasear") || lowercase.includes("vacaciones")) {
      concept = "Visa de Turismo";
    } else if (lowercase.includes("trabajo") || lowercase.includes("empleo") || lowercase.includes("canadá")) {
      concept = "Visa de Trabajo";
    }

    if (concept && !consultationHistory.includes(concept)) {
      const updatedHistory = [concept, ...consultationHistory.slice(0, 4)];
      setConsultationHistory(updatedHistory);
      localStorage.setItem("sofia_consultation_history", JSON.stringify(updatedHistory));
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Save intent or keyword
    saveConsultationKeyword(textToSend);

    // Try to extract name if they introduce themselves (e.g. "me llamo Carlos" or "mi nombre es Maria")
    const nameMatch = textToSend.match(/(?:me llamo|mi nombre es|soy)\s+([A-Za-zÁ-ÿ]+)/i);
    if (nameMatch && nameMatch[1]) {
      const detectedName = nameMatch[1].trim();
      setUserName(detectedName);
      localStorage.setItem("cl_user_name", detectedName);
    }

    try {
      // Build sliding context history to pass to backend (last 10 messages)
      const currentHistory = messages.slice(-10).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: currentHistory,
        }),
      });

      if (!res.ok) throw new Error("Server error");
      const data: AssistantResponse = await res.json();

      const sofiaMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: "sofia",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, sofiaMsg]);
      setSuggestions(data.suggestions);
      
      if (data.userIntent) {
        setLastIntent(data.userIntent);
        localStorage.setItem("sofia_last_intent", data.userIntent);
      }
      if (data.detectedLanguage) {
        setDetectedLang(data.detectedLanguage);
        localStorage.setItem("sofia_detected_lang", data.detectedLanguage);
      }

    } catch (error) {
      console.error(error);
      // Nice error response without breaking the experience
      const errorMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: "sofia",
        text: "Mire, le explico: mi conexión interna a los servidores consulares está un poco demorada técnica, pero no se preocupe por su sueño de viajar legal. ¿Por qué no conversamos directamente con un asesor por WhatsApp para contestarle de forma inmediata? Nos puede escribir a nuestro chat directo e iniciar hoy mismo.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setSuggestions(["Escribir por WhatsApp directo", "Ver precios del trámite"]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const clearChatHistory = () => {
    localStorage.removeItem("sofia_chat_messages");
    localStorage.removeItem("cl_user_name");
    localStorage.removeItem("sofia_last_intent");
    localStorage.removeItem("sofia_detected_lang");
    localStorage.removeItem("sofia_consultation_history");
    setMessages([]);
    setUserName("");
    setLastIntent("");
    setDetectedLang("es");
    setConsultationHistory([]);
    initializeDefaultGreeting("");
  };

  // Helper to open WhatsApp Direct Chat
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "¡Hola Conexión Laboral! Estuve platicando con Sofía en su asistente virtual. Me interesa recibir asesoría personalizada para el trámite de mi Visa."
    );
    window.open(`https://wa.me/50252413504?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Soft hint text above chat */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ delay: 1 }}
              className="mb-2 mr-1 bg-white text-gray-800 text-xs py-1.5 px-3 rounded-xl shadow-lg border border-teal-100 font-medium flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ¿Dudas? Chatea con Sofía 👩‍💼
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-teal-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white focus:outline-none"
          id="btn_sofia_chat"
        >
          {isOpen ? (
            <X className="w-6 h-6 shrink-0" />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={sofiaAvatar}
                alt="Sofia"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0.5 right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white"></span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[550px] max-h-[calc(100vh-10rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col"
            id="panel_sofia_chat"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                  <img
                    src={sofiaAvatar}
                    alt="Sofia Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 bg-emerald-500 w-2.5 h-2.5 rounded-full border border-white"></span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                    Sofía
                    <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-400/20 font-normal">
                      Asesora Virtual
                    </span>
                  </h3>
                  <p className="text-[11px] text-teal-100 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Responde al instante • Multilingüe
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Clear history button */}
                <button
                  onClick={clearChatHistory}
                  title="Reiniciar chat"
                  className="p-1.5 hover:bg-white/10 rounded-lg text-teal-100 hover:text-white transition-all cursor-pointer"
                >
                  <History className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-teal-100 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick stats / Consulted topics indicator (registros de consultas) */}
            {consultationHistory.length > 0 && (
              <div className="bg-teal-50/70 border-b border-teal-100 px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] text-teal-800 font-medium flex items-center gap-1">
                  <History className="w-3 h-3" /> Temas consultados:
                </span>
                <div className="flex gap-1 overflow-x-auto max-w-[200px] no-scrollbar">
                  {consultationHistory.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-white text-teal-700 px-1.5 py-0.5 rounded-md border border-teal-100 max-w-[70px] truncate"
                      title={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider font-mono font-medium">
                Conexión Segura con Conexión Laboral
              </p>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                      msg.sender === "user"
                        ? "bg-teal-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    {/* Convert simple double line breaks to spacing for nicer look */}
                    <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                    <span
                      className={`text-[9px] block mt-1.5 text-right ${
                        msg.sender === "user" ? "text-teal-200" : "text-gray-400"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 rounded-bl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions Chips */}
            <div className="p-3 bg-white border-t border-gray-100">
              <p className="text-[11px] text-gray-400 mb-2 flex items-center gap-1 font-medium select-none">
                <Sparkles className="w-3 h-3 text-teal-600" /> Clic sugerido:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-teal-50 hover:bg-teal-100 text-teal-800 px-2.5 py-1.5 rounded-full border border-teal-100 text-left cursor-pointer active:scale-95 transition-all truncate max-w-full"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                placeholder={detectedLang === "en" ? "Type to search or chat..." : "Escribe tu consulta aquí..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                className="flex-1 text-sm bg-white border border-gray-200 focus:border-teal-500 rounded-xl px-3 py-2.5 outline-none font-sans text-gray-800 placeholder-gray-400"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="bg-teal-700 hover:bg-teal-800 text-white p-2.5 rounded-xl cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Direct WhatsApp shortcut inside assistant panel */}
            <div className="bg-teal-900 text-white py-2 px-3 text-center text-xs font-semibold hover:bg-teal-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5" onClick={openWhatsApp}>
              <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
              ¿Prefieres WhatsApp? Habla con un Humano
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

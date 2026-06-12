import { useState } from "react";
import { AssessmentForm } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle, 
  HelpCircle, 
  MessageCircle, 
  Users, 
  Building, 
  Calendar, 
  Globe, 
  AlertTriangle, 
  Sparkles,
  RefreshCw,
  TrendingUp,
  Award
} from "lucide-react";

export default function AssessmentWizard() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<AssessmentForm>({
    fullName: "",
    phoneNumber: "",
    targetCountry: "",
    visaType: "",
    hasPreviousRefusal: "",
    hasStableJobOrBusiness: "",
    hasAssetsOrFamilyTies: "",
    address: "",
    experience: "",
    jobType: "",
    educationLevel: "",
  });

  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelect = (field: keyof AssessmentForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: keyof AssessmentForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1 && (!form.fullName.trim() || !form.phoneNumber.trim() || !form.address?.trim())) {
      alert("Por favor, ingrese su nombre, teléfono y dirección para continuar.");
      return;
    }
    if (step === 2 && !form.targetCountry) {
      alert("Por favor, elija el país de destino.");
      return;
    }
    if (step === 3 && (!form.visaType || !form.educationLevel || !form.jobType?.trim() || !form.experience)) {
      alert("Por favor, complete todos los campos del perfil laboral: tipo de visa, nivel de estudios, tipo de trabajo y experiencia.");
      return;
    }
    if (step === 4 && (!form.hasStableJobOrBusiness || !form.hasAssetsOrFamilyTies || !form.hasPreviousRefusal)) {
      alert("Por favor, responda todas las preguntas de estabilidad para calcular su perfil.");
      return;
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setForm({
      fullName: "",
      phoneNumber: "",
      targetCountry: "",
      visaType: "",
      hasPreviousRefusal: "",
      hasStableJobOrBusiness: "",
      hasAssetsOrFamilyTies: "",
      address: "",
      experience: "",
      jobType: "",
      educationLevel: "",
    });
    setIsCalculated(false);
  };

  // Profile engine to calculate dynamic visual assessment score
  const calculateResult = () => {
    let score = 55; // Base starting point
    
    if (form.hasStableJobOrBusiness === "Sí") score += 20;
    if (form.hasAssetsOrFamilyTies === "Sí") score += 15;
    if (form.hasPreviousRefusal === "No") score += 10;
    else score -= 15; // previous refusals need expert guidance

    // clamp between 10 and 95
    return Math.max(15, Math.min(score, 95));
  };

  const finalScore = calculateResult();

  const getDialColor = () => {
    if (finalScore >= 75) return "bg-emerald-500 text-emerald-950 border-emerald-300";
    if (finalScore >= 50) return "bg-yellow-500 text-yellow-950 border-yellow-300";
    return "bg-amber-600 text-white border-amber-400";
  };

  const getAnalysisMessage = () => {
    if (finalScore >= 75) {
      return {
        title: "Perfil Sólido con Buen Arraigo",
        badge: "Altas Probabilidades",
        desc: "Tu perfil cuenta con factores muy favorables para la aprobación consular (estabilidad familiar y económica). Sin embargo, la mayor causa de rechazos en perfiles fuertes es un error técnico en el formulario DS-160 o contradicciones nerviosas durante la entrevista.",
        action: "¡No te confíes! Deja que Conexión Laboral complete tus formularios estratégicamente y realice los simulacros oficiales.",
      };
    } else if (finalScore >= 50) {
      return {
        title: "Perfil Intermedio (Requiere Fortalecimiento)",
        badge: "Probabilidad Moderada",
        desc: "Tienes factores positivos, pero también algunos puntos grises que el cónsul cuestionará con severidad. Necesitas estructurar de forma muy minuciosa cómo declarar tus ingresos y cómo justificar tu arraigo para mitigar riesgos de rechazo.",
        action: "Tu perfil requiere nuestra asesoría experta para organizar tu expediente de soporte y practicar respuestas clave antes de la cita.",
      };
    } else {
      return {
        title: "Perfil Delicado (Alerta de Rechazo)",
        badge: "Análisis Crítico Requerido",
        desc: "Actualmente cuentas con factores de riesgo elevados (p.ej. falta de arraigos fuertes inscritos, o rechazo anterior). Presentarte hoy sin una estrategia profesional sólida incrementa el riesgo de un rechazo automático bajo la sección 214(b).",
        action: "¡No vayas a ciegas! Nuestro equipo se especializa en revertir casos complejos mediante justificaciones sólidas y re-estructuración integral.",
      };
    }
  };

  const assessment = getAnalysisMessage();

  // Prepares the WhatsApp Business link
  const handleContactWhatsApp = () => {
    // Collect user information to save and pass to team
    localStorage.setItem("cl_user_name", form.fullName);
    localStorage.setItem("cl_user_phone", form.phoneNumber);

    const whatsappMsg = [
      `¡Hola *Conexión Laboral*! He realizado mi autoevaluación de visa en la web:`,
      `👤 *Nombre:* ${form.fullName}`,
      `📞 *Teléfono:* ${form.phoneNumber}`,
      `📍 *Dirección:* ${form.address || "No especificada"}`,
      `🎓 *Estudios:* ${form.educationLevel || "No especificado"}`,
      `💼 *Tipo de Trabajo / Oficio:* ${form.jobType || "No especificado"}`,
      `⏳ *Experiencia Laboral:* ${form.experience || "No especificada"}`,
      `🌎 *Destino de Interés:* Visa para ${form.targetCountry}`,
      `📁 *Tipo de Visa:* ${form.visaType}`,
      `👔 *¿Empleo/Negocio?:* ${form.hasStableJobOrBusiness}`,
      `🏡 *¿Arraigos Fuertes?:* ${form.hasAssetsOrFamilyTies}`,
      `⚠️ *¿Visa negada antes?:* ${form.hasPreviousRefusal}`,
      `📊 *Resultado Diagnóstico:* En mi pre-evaluación obtuve aprox *${finalScore}%* de estabilidad del perfil.`,
      `Me gustaría coordinar con su equipo una *Evaluación 100% Gratuita* en sus oficinas de Zona 16 o vía virtual para formalizar mi trámite.`
    ].join("\n");

    const encoded = encodeURIComponent(whatsappMsg);
    window.open(`https://wa.me/50252413504?text=${encoded}`, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden" id="wizard_evaluacion">
      {/* Header Panel */}
      <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/50 via-slate-950 to-slate-950 opacity-90"></div>
        <div className="relative z-10">
          <span className="bg-teal-500/20 text-teal-300 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-teal-500/30">
            Trámite Inteligente USA & Canadá
          </span>
          <h3 className="text-xl font-bold tracking-tight mt-2.5">
            Pre-Evaluación de Visa Digital
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
            Descubre qué tan sólido es tu perfil migratorio en 4 simples pasos antes de presentarte a la embajada.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!isCalculated ? (
          <div>
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between mb-8 max-w-sm mx-auto">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs border transition-all ${
                      step === num
                        ? "bg-teal-600 text-white border-teal-600 ring-4 ring-teal-100"
                        : step > num
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : "bg-gray-100 text-gray-400 border-gray-200"
                    }`}
                  >
                    {num}
                  </div>
                  {num < 4 && (
                    <div
                      className={`w-12 h-0.5 mx-1 transition-all ${
                        step > num ? "bg-emerald-300" : "bg-gray-100"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Steps Container */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase block">
                      Paso 1: Información básica de Registro
                    </span>
                    <h4 className="text-md font-bold text-gray-900">
                      ¿A quién tenemos el gusto de asesorar?
                    </h4>
                    <p className="text-xs text-gray-500">
                      Tus datos son completamente privados y se utilizarán para generar tu mensaje directo a nuestros asesores consulares.
                    </p>
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="p.ej. Carlos Daniel Alvarado"
                          className="w-full text-sm border border-gray-200 focus:border-teal-500 rounded-lg p-2.5 outline-none text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Teléfono de WhatsApp
                        </label>
                        <input
                          type="text"
                          value={form.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          placeholder="p.ej. 50255554444"
                          className="w-full text-sm border border-gray-200 focus:border-teal-500 rounded-lg p-2.5 outline-none text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Dirección (Municipio y Departamento)
                        </label>
                        <input
                          type="text"
                          value={form.address || ""}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="p.ej. Villa Nueva, Guatemala"
                          className="w-full text-sm border border-gray-200 focus:border-teal-500 rounded-lg p-2.5 outline-none text-gray-800"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase block">
                      Paso 2: País destino
                    </span>
                    <h4 className="text-md font-bold text-gray-900">
                      ¿Qué país del norte te interesa visitar o aplicar?
                    </h4>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSelect("targetCountry", "USA")}
                        className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                          form.targetCountry === "USA"
                            ? "bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-100"
                            : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="text-3xl block mb-2">🇺🇸</span>
                        <span className="text-sm font-semibold">Estados Unidos</span>
                        <span className="text-[10px] text-gray-400 block mt-1">Visa Turismo & Trabajo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelect("targetCountry", "Canadá")}
                        className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                          form.targetCountry === "Canadá"
                            ? "bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-100"
                            : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="text-3xl block mb-2">🇨🇦</span>
                        <span className="text-sm font-semibold">Canadá</span>
                        <span className="text-[10px] text-gray-400 block mt-1">Visa Turismo, Trabajo & ETA</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase block">
                      Paso 3: Objetivo del Viaje
                    </span>
                    <h4 className="text-md font-bold text-gray-900">
                      ¿Qué tipo de visa deseas tramitar?
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSelect("visaType", "Turismo")}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          form.visaType === "Turismo"
                            ? "bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-100"
                            : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="text-xs font-semibold text-teal-700 block mb-1">Turista / Negocios</span>
                        <span className="text-sm font-bold text-gray-900">Visa B1/B2 o Visitante</span>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Ideal para ir de compras, vacaciones, visitar familiares o citas médicas.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelect("visaType", "Trabajo")}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          form.visaType === "Trabajo"
                            ? "bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-100"
                            : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="text-xs font-semibold text-teal-700 block mb-1">Laboral</span>
                        <span className="text-sm font-bold text-gray-900">Visa de Trabajo Temporal</span>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Ideal para agricultores, técnicos o profesionales contratados legalmente en el norte.
                        </p>
                      </button>
                    </div>

                    {/* Campos Adicionales de Perfil Laboral */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <label className="block text-xs font-semibold text-gray-750 mb-1 font-medium">
                          Nivel de Estudio
                        </label>
                        <select
                          value={form.educationLevel || ""}
                          onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                          className="w-full text-xs border border-gray-200 focus:border-teal-500 rounded-lg p-2.5 outline-none text-gray-800 bg-white cursor-pointer"
                        >
                          <option value="">-- Seleccionar --</option>
                          <option value="Primaria / Básicos">Primaria / Básicos</option>
                          <option value="Diversificado / Bachiller">Diversificado / Bachiller</option>
                          <option value="Técnico / Universidad Incompleta">Técnico / Universidad Incompleta</option>
                          <option value="Universitario Graduado">Universitario Graduado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-750 mb-1 font-medium">
                          Años de Experiencia Laboral
                        </label>
                        <select
                          value={form.experience || ""}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          className="w-full text-xs border border-gray-200 focus:border-teal-500 rounded-lg p-2.5 outline-none text-gray-800 bg-white cursor-pointer"
                        >
                          <option value="">-- Seleccionar --</option>
                          <option value="Menos de 2 años">Menos de 2 años</option>
                          <option value="2 a 5 años">2 a 5 años</option>
                          <option value="Más de 5 años">Más de 5 años</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-750 mb-1 font-medium">
                          Tipo de Trabajo u Oficio Actual
                        </label>
                        <input
                          type="text"
                          value={form.jobType || ""}
                          onChange={(e) => handleInputChange("jobType", e.target.value)}
                          placeholder="p.ej. Agricultor, Técnico Electricista, Perito Contador, Enfermera"
                          className="w-full text-xs border border-gray-200 focus:border-teal-500 rounded-lg p-2.5 outline-none text-gray-850"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase block">
                      Paso 4: Preguntas Clave de Estabilidad (Arraigos)
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">
                      Responde minuciosamente sobre tu arraigo en Guatemala:
                    </h4>

                    <div className="space-y-3 pt-1">
                      {/* Q1 */}
                      <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-150">
                        <label className="block text-xs font-semibold text-gray-800 mb-1.5 leading-tight">
                          1) ¿Tienes empleo estable (formal) o negocio propio formal registrado?
                        </label>
                        <div className="flex gap-2">
                          {["Sí", "No"].map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => handleSelect("hasStableJobOrBusiness", v)}
                              className={`flex-1 text-xs py-1.5 rounded-md border font-medium cursor-pointer transition-all ${
                                form.hasStableJobOrBusiness === v
                                  ? "bg-teal-700 border-teal-700 text-white"
                                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q2 */}
                      <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-150">
                        <label className="block text-xs font-semibold text-gray-800 mb-1.5 leading-tight">
                          2) ¿Posees bienes raíces, títulos de propiedad o fuertes arraigos familiares (cónyuge, hijos)?
                        </label>
                        <div className="flex gap-2">
                          {["Sí", "No"].map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => handleSelect("hasAssetsOrFamilyTies", v)}
                              className={`flex-1 text-xs py-1.5 rounded-md border font-medium cursor-pointer transition-all ${
                                form.hasAssetsOrFamilyTies === v
                                  ? "bg-teal-700 border-teal-700 text-white"
                                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q3 */}
                      <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-150">
                        <label className="block text-xs font-semibold text-gray-800 mb-1.5 leading-tight">
                          3) ¿Te han rechazado o negado alguna Visa para USA/Canadá anteriormente?
                        </label>
                        <div className="flex gap-2">
                          {["Sí", "No"].map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => handleSelect("hasPreviousRefusal", v)}
                              className={`flex-1 text-xs py-1.5 rounded-md border font-medium cursor-pointer transition-all ${
                                form.hasPreviousRefusal === v
                                  ? "bg-teal-700 border-teal-700 text-white"
                                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {v === "Sí" ? "Sí, anteriormente" : "No, es mi primera vez"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons footer */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`text-xs font-semibold px-4 py-2 border rounded-lg active:scale-95 transition-all text-gray-500 cursor-pointer ${
                  step === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
              >
                Atrás
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                {step === 4 ? "Calcular Perfil" : "Siguiente"}
              </button>
            </div>
          </div>
        ) : (
          /* Assessment Diagnostic Results Section (Conversion optimized) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Success Dial */}
            <div className="text-center">
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase font-mono">
                Autodiagnóstico de Arraigo
              </span>
              
              <div className="my-5 relative flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-4 border-gray-100 flex flex-col items-center justify-center p-3">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {finalScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">
                    Solidez
                  </span>
                </div>
                {/* Accent element based on score */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping"></div>
              </div>

              <div className={`inline-block border px-3 py-1 rounded-full text-xs font-bold ${getDialColor()}`}>
                {assessment.badge}
              </div>
            </div>

            {/* Analysis text card */}
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 sm:p-5 space-y-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 leading-tight">
                <Award className="w-4 h-4 text-teal-600 shrink-0" />
                {assessment.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {assessment.desc}
              </p>
              <div className="bg-teal-50 border border-teal-150 p-3 rounded-lg text-[11px] font-medium text-teal-900 leading-relaxed">
                💡 <strong>Consejo del Experto:</strong> {assessment.action}
              </div>
            </div>

            {/* Direct WhatsApp Call to Action Button */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleContactWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 group active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-500 group-hover:rotate-6 transition-transform" />
                Agendar Evaluación Gratis con Mi Reporte
              </button>

              <button
                type="button"
                onClick={resetCalculator}
                className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 text-xs font-medium py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Volver a evaluar con otros datos
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Directo
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Presencial frente a Embajada
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Building, 
  MapPin, 
  Clock, 
  Smartphone, 
  CheckCircle, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  Calendar,
  ChevronRight,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Award,
  ChevronDown
} from "lucide-react";
import { VISA_STEPS } from "./types";
import AssessmentWizard from "./components/AssessmentWizard";
import PricingWidget from "./components/PricingWidget";
import EmbajadaMap from "./components/EmbajadaMap";
import SofiaChatbot from "./components/SofiaChatbot";

export default function App() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setActiveFAQ(activeFAQ === idx ? null : null);
  };

  const handleScrollToWizard = () => {
    const el = document.getElementById("diagnostic-center");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenSofia = () => {
    // Programmatically trigger btn_sofia_chat click to welcome the user
    const el = document.getElementById("btn_sofia_chat");
    if (el) {
      el.click();
    }
  };

  const openWhatsAppGeneral = () => {
    const text = encodeURIComponent(
      "¡Hola Conexión Laboral! Deseo agilizar mi asesoría de visa. Me gustaría conversar con un asesor experto."
    );
    window.open(`https://wa.me/50252413504?text=${text}`, "_blank");
  };

  const FAQS = [
    {
      q: "¿Es seguro el proceso? ¿Cómo sé que no es una estafa?",
      a: "Totalmente seguro. En Conexión Laboral cobramos una tarifa plana de Q.1,850.00 de manera transparente y facturada. Nuestras oficinas físicas están formalmente constituidas en Boulevard Austriaco, zona 16, directamente frente a la Embajada de Estados Unidos. Nunca te prometeremos 'visas aseguradas' ni realizaremos prácticas ilegales, ya que el único que otorga la visa es el cónsul. Nosotros nos encargamos de que tu perfil demuestre solidez y no sea rechazado por errores de llenado o preparación."
    },
    {
      q: "¿Qué pasa si me niegan la visa? ¿Tienen alguna garantía?",
      a: "La decisión final de conceder una visa corresponde únicamente a las autoridades de las embajadas de USA y Canadá. Ninguna agencia seria puede garantizar la aprobación. Lo que nosotros garantizamos por contrato es un llenado 100% libre de errores de tu formulario oficial DS-160/IMM-5257 y simulacros de entrevista con base en preguntas reales. Si tu perfil es rechazado, te acompañaremos a analizar el motivo exacto del rechazo para reestructurar tu caso para un segundo intento con un descuento especial."
    },
    {
      q: "No vivo en la Ciudad de Guatemala, ¿pueden atenderme?",
      a: "¡Sí, por supuesto! Atendemos a muchísimos clientes de Huehuetenango, San Marcos, Quetzaltenango y otros departamentos. Ofrecemos asesoría y simulacros 100% de manera virtual por videollamada (Zoom o WhatsApp). Así evitas costos de traslado innecesarios hasta el día de tu cita consular física."
    },
    {
      q: "¿Qué documentos debo de llevar a mi evaluación gratuita?",
      a: "Para tu primera cita (presencial o virtual), únicamente necesitas tener a la mano tu DPI y tu Pasaporte vigente (si ya lo tienes). No requieres presentar escrituras ni estados de cuenta bancarios en esta fase; nuestros asesores te indicarán exactamente qué documentos de soporte serán necesarios recolectar según tu propio diagnóstico de arraigo."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-teal-500/30 selection:text-teal-900">
      
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              Blvd. Austriaco, Zona 16, Frente a Embajada USA
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              Lun - Vie: 8:00 AM - 5:00 PM | Sáb: 8:00 AM - 12:00 PM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
              Asesores en línea
            </span>
            <span className="text-slate-400">Guatemala</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20">
              <span className="font-display font-black text-xl tracking-tighter">CL</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-gray-900 block leading-none">
                Conexión Laboral
              </span>
              <span className="text-[10px] text-gray-500 tracking-wider font-semibold uppercase block mt-1">
                Asesoría Migratoria
              </span>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openWhatsAppGeneral}
              className="hidden md:flex text-gray-700 hover:text-teal-700 font-bold text-xs items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-emerald-500" />
              +502 5241-3504
            </button>

            <button
              onClick={handleScrollToWizard}
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-md shadow-teal-700/10 transition-all cursor-pointer hover:shadow-lg active:scale-95"
            >
              Evaluación Gratis
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Optimized for High Conversion) */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.15),transparent_45%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text columns */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 select-none">
            <span className="inline-flex items-center gap-1.5 bg-teal-500/15 text-teal-300 font-bold text-xs px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest leading-none">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Evaluación Inicial 100% Gratis
            </span>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-5.5xl text-white tracking-tight leading-[1.1]">
              ¿Quieres viajar legal a <span className="text-teal-400 underline decoration-teal-600/50 underline-offset-4">Estados Unidos</span> o Canadá?
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              ¡Tu futuro en el norte empieza aquí! En <strong>Conexión Laboral</strong> te asesoramos paso a paso en el trámite de tu Visa. Conectamos talento real con oportunidades reales de manera 100% legal, honesta y sin estafas.
            </p>

            {/* Quick Benefits lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-lg">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">Pre-Evaluación gratis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">Frente a la Embajada (Zona 16)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">Llenado oficial profesional</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">Q.1,850 sin costos ocultos</span>
              </div>
            </div>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleScrollToWizard}
                className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-teal-600/20 active:scale-95 transition-all text-center shrink-0 cursor-pointer"
              >
                Comenzar Autoevaluación Gratis
              </button>

              <button
                onClick={handleOpenSofia}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm px-5 py-3.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Chatear con Sofía Virtual</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              </button>
            </div>
          </div>

          {/* Quick interactive widget: Client Trust Testimonial Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-teal-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              
              {/* Testimonial Header block */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                  👨‍🌾
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-teal-400 tracking-wider">
                    Caso de Éxito Real
                  </h4>
                  <span className="text-sm font-bold block text-white">Don Carlos Alvarado</span>
                  <span className="text-[10px] text-slate-400 font-mono">Visa de Trabajo Temporal Aprobada ✅</span>
                </div>
              </div>

              {/* Speech */}
              <blockquote className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;¡Otro chapín que viaja legal! Don Carlos confió en Conexión Laboral y hoy ya tiene su visa de trabajo aprobada. Evitó caer en estafas de internet y fue preparado con simulacros profesionales. ¿Quieres ser el siguiente?&rdquo;
              </blockquote>

              {/* Location Tag */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Tramitado en Guatemala
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-semibold border border-emerald-500/20">
                  100% Legal
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Stats Bento banner */}
      <section className="bg-white border-b border-gray-100 py-8 shadow-inner select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block font-display font-black text-2xl sm:text-3.5xl text-teal-700 tracking-tight">
              Q.1,850.00
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mt-1">
              Tarifa Plana Única
            </span>
          </div>
          <div className="border-l border-gray-100">
            <span className="block font-display font-black text-2xl sm:text-3.5xl text-teal-700 tracking-tight">
              Frente Embajada
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mt-1">
              Dirección en Zona 16
            </span>
          </div>
          <div className="border-l border-gray-100">
            <span className="block font-display font-black text-2xl sm:text-3.5xl text-teal-700 tracking-tight">
              100% Gratuita
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mt-1">
              Evaluación de Perfil
            </span>
          </div>
          <div className="border-l border-gray-100">
            <span className="block font-display font-black text-2xl sm:text-3.5xl text-teal-700 tracking-tight">
              Acompañado
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mt-1">
              Hacia tu cita consular
            </span>
          </div>
        </div>
      </section>

      {/* Visual Step-by-Step process timeline */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16 select-none">
          <span className="text-teal-700 text-xs font-extrabold uppercase tracking-widest font-mono">
            ¿Cómo trabajamos?
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4.5xl text-gray-900 tracking-tight leading-tight">
            El Proceso hacia tu Visa Aprobada
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Te guiamos de manera rigurosa y transparente desde tu primer análisis laboral hasta la entrevista oficial.
          </p>
        </div>

        {/* Timeline grid flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {VISA_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Number sphere indicator */}
                <span className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-bold flex items-center justify-center text-sm font-mono shadow-sm">
                  0{step.number}
                </span>

                <h3 className="text-base font-extrabold text-gray-900 tracking-tight leading-tight pt-1">
                  {step.title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.description}
                </p>

                {/* Bullets details included */}
                <ul className="space-y-1.5 pt-2 border-t border-gray-50">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-[11px] text-gray-600 flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5 font-bold shrink-0">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleScrollToWizard}
                className="text-[11px] font-bold text-teal-700 hover:text-teal-800 pt-3 flex items-center gap-1 group transition-colors text-left cursor-pointer mt-4"
              >
                <span>{step.cta}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* Diagonal banner promoting US cross-office and safety */}
      <section className="bg-slate-900 text-white py-14 border-y border-slate-800 relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-teal-950/20 opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-teal-400 text-xs font-mono font-bold uppercase tracking-wider block">
              El Secreto del Éxito Consular
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              ¿Sabías que una sola contradicción puede cancelar tu Visa?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Muchos solicitantes con perfiles muy fuertes e ingresos reales de quetzales son rechazados en la Embajada únicamente porque no saben cómo responder bajo estrés o descuidaron su declaración en el Formulario DS-160. Nosotros remediamos esto.
            </p>
          </div>
          <button
            onClick={handleScrollToWizard}
            className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shrink-0 cursor-pointer"
          >
            Empezar Preparación Gratis
          </button>
        </div>
      </section>

      {/* Core Conversion Block: Diagnostic and Profile qualifiers Form */}
      <section id="diagnostic-center" className="py-16 sm:py-24 bg-teal-50/50 scroll-mt-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Context persuasion column explaining trust / clarity in Guatemalan market */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-teal-700 text-xs font-bold uppercase tracking-widest font-mono">
                Claridad y Confianza Total
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4.5xl text-gray-900 tracking-tight leading-tight">
                Evita Errores y Asegura Tu Trámite
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                El público de Guatemala busca dos cosas primordiales antes de iniciar su trámite: <strong>Confianza</strong> de que su dinero está a salvo de fraudes en línea, y <strong>Claridad</strong> absoluta sobre si aplican o no para la visa. 
              </p>

              <div className="space-y-4">
                {/* Assurance point 1 */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-150 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                    🛡️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Ubicación Física Transparente</h4>
                    <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                      No somos un perfil fantasma de redes sociales. Atendemos físicamente frente a la valla de la Embajada de USA en Zona 16.
                    </p>
                  </div>
                </div>

                {/* Assurance point 2 */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-150 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                    📋
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Diagnóstico Honesto de Viabilidad</h4>
                    <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                      Si detectamos que tu perfil migratorio flaquea, te lo diremos con franqueza y diseñaremos un plan de acción para reforzarlo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Directly request customized help */}
              <div className="bg-teal-900/5 border border-teal-100 rounded-xl p-4 text-center ">
                <p className="text-xs text-teal-950 font-medium">
                  ¿Prefieres asesoría premium uno a uno?
                </p>
                <button
                  onClick={openWhatsAppGeneral}
                  className="mt-2 text-xs font-bold bg-white hover:bg-gray-50 text-emerald-800 border-2 border-emerald-500 px-4 py-2.5 rounded-lg inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-500 text-white shrink-0" />
                  Platicar con Asesor por WhatsApp
                </button>
              </div>
            </div>

            {/* Assessment Wizard column */}
            <div className="lg:col-span-7">
              <AssessmentWizard />
            </div>

          </div>

        </div>
      </section>

      {/* Flat Pricing widget grid section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 select-none">
            <span className="text-teal-700 text-xs font-bold uppercase tracking-widest font-mono">
              Inversión única y accesible
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4.5xl text-gray-900 tracking-tight leading-tight">
              Un único pago de Q.1,850. Sin sorpresas, de principio a fin.
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-lg">
              En Guatemala, existen asesores informales que añaden cobros ocultos por cada simulacro o por imprimir tu hoja de cita. Nuestra propuesta de valor en Conexión Laboral es una cotización transparente y fijada.
            </p>

            {/* Inclusions widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Análisis y Ajuste Personal</h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Revisamos tus ingresos, propiedades y DPI para declarar solo datos estables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Llenado oficial profesional</h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Sometemos el formulario DS-160/IMM-5257 a una triple validación interna.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 font-sans">Simulacro frente a la Embajada</h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Practica en nuestras oficinas en Zona 16 minutos antes de entrar con los mismos criterios del cónsul.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Casillero Seguro de Objetos</h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Guarda tus teléfonos, carteras y cargadores de forma segura en nuestra bóveda antes de ingresar.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl flex items-center gap-3">
              <span className="text-lg">📢</span>
              <p className="text-xs text-teal-900 leading-relaxed font-semibold">
                <i>¿Sabías qué?</i> Nuestro índice de re-aprobación para personas previamente rechazadas se duplica gracias al simulacro de entrevista. ¡Aprende qué responder!
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <PricingWidget />
          </div>

        </div>
      </section>

      {/* Location Map Widget */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest font-mono">
              Frente a Embajada de USA
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4.5xl text-white tracking-tight leading-tight">
              Ahorra Tiempo y Ven con Confianza
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Muchos guatemaltecos se pierden intentando encontrar parqueos informales arriesgados o locales improvisados el día de su cita. Conexión Laboral está ubicado estratégicamente en el Boulevard Austriaco, justo cruzando la vía desde la Embajada de USA.
            </p>

            <div className="space-y-4 pt-1 text-xs">
              <div className="flex gap-2.5 items-start">
                <div className="p-1 rounded bg-slate-800 text-teal-400 shrink-0">📍</div>
                <div>
                  <strong className="text-slate-100">Dirección Exacta:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Boulevard Austriaco, zona 16, frente a la Embajada de USA.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="p-1 rounded bg-slate-800 text-teal-400 shrink-0">🚗</div>
                <div>
                  <strong className="text-slate-100">Parqueo Seguro Vigilado:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Estaciónate sin cargos mientras realizas tus simulaciones o vas a tu cita oficial.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="p-1 rounded bg-slate-800 text-teal-400 shrink-0">🔒</div>
                <div>
                  <strong className="text-slate-100">Casilleros y Bóveda:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Tus pertenencias están a salvo. Te cuidamos los teléfonos inteligentes que prohíbe el cónsul.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EmbajadaMap />
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions with convert focus */}
      <section className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12 select-none">
          <span className="text-teal-700 text-xs font-bold uppercase tracking-widest font-mono">
            ¿Tienes dudas?
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3.5xl text-gray-900 tracking-tight leading-tight">
            Preguntas Frecuentes de Clientes
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-150 p-4 sm:p-5 shadow-sm transition-all cursor-pointer"
              onClick={() => toggleFAQ(idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  {faq.q}
                </h4>
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              
              <div className="text-xs text-gray-600 leading-relaxed mt-2.5 pt-2.5 border-t border-gray-50">
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-3">
          <p className="text-xs text-gray-500">
            ¿Aún tienes alguna pregunta sobre el llenado o el costo de Q.1,850?
          </p>
          <button
            onClick={handleOpenSofia}
            className="text-xs font-extrabold text-teal-700 hover:text-teal-800 flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            Pregúntale a Sofía Virtual 👩‍💼 <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </section>

      {/* Main Footer layout */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                CL
              </div>
              <strong className="text-white text-base">Conexión Laboral</strong>
            </div>
            <p className="text-slate-400 text-xs leading-normal max-w-xs">
              Agencia líder experta en asesoría migratoria, formularios consulares y simulacros de entrevista consular para Estados Unidos y Canadá en Ciudad de Guatemala.
            </p>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Contacto y Canales
            </h4>
            <div className="space-y-2 text-xs leading-normal">
              <span className="block">📞 Teléfono Central: <strong>+502 5241-3504</strong></span>
              <span className="block text-emerald-400">🟢 WhatsApp Business: <strong>+502 5241-3504</strong></span>
              <span className="block">✉️ Email: <strong>info@conexionlaboral.com.gt</strong></span>
              <span className="block">🏢 Sede física: Boulevard Austriaco, zona 16, frente a la Embajada de USA.</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Información Legal y Descargo
            </h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              Aviso Consular: Conexión Laboral es una entidad de asesoría migratoria privada independiente no afiliada al gobierno federal de los Estados Unidos o el gobierno de Canadá. La concesión de ingreso oficial queda al absoluto arbitrio de sus respectivos cuerpos consulares. No proveemos asesoría legal formal, sino técnica y de preparación documental en Guatemala.
            </p>
            <span className="block text-[10px] text-slate-500 pt-2 font-mono">
              © {new Date().getFullYear()} Conexión Laboral Guatemala. Todos los derechos reservados.
            </span>
          </div>

        </div>
      </footer>

      {/* Floating Sofia Bot Overlays */}
      <SofiaChatbot />

    </div>
  );
}

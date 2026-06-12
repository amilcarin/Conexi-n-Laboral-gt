import { SERVICES_INCLUDED } from "../types";
import { Check, X, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";

export default function PricingWidget() {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "¡Hola Conexión Laboral! Me interesa reservar mi cita de evaluación gratuita esta semana para el trámite de mi Visa por Q.1,850.00."
    );
    window.open(`https://wa.me/50252413504?text=${text}`, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-teal-500/20 overflow-hidden relative" id="pricing_widget">
      {/* Decorative tag */}
      <div className="absolute top-4 right-4 bg-teal-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">
        Oferta de Temporada
      </div>

      <div className="p-6 bg-gradient-to-br from-teal-700/5 to-emerald-900/5 border-b border-gray-100 flex flex-col justify-center items-center text-center">
        <span className="text-xs font-bold text-teal-800 tracking-wider uppercase mb-1">
          Inversión Total por Asesoría
        </span>
        <div className="flex items-baseline gap-1 my-3 justify-center">
          <span className="text-2xl font-black text-gray-900">Q.</span>
          <span className="text-5xl font-black text-gray-900 tracking-tight">1,850</span>
          <span className="text-lg font-bold text-gray-500">.00</span>
        </div>
        <p className="text-xs text-slate-500 max-w-sm">
          Un único pago transparente que te acompaña de principio a fin hasta tener tu pasaporte visado en mano.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            ¿Qué incluye tu servicio integral?
          </h4>
          <div className="space-y-3.5">
            {SERVICES_INCLUDED.map((service, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {service.included ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                      <X className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <div>
                  <h5 className={`text-sm font-bold ${service.included ? 'text-gray-900' : 'text-gray-500 font-medium'}`}>
                    {service.title}
                  </h5>
                  <p className="text-xs text-gray-500 leading-normal mt-0.5">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning disclaimer note */}
        <div className="bg-amber-50 border border-amber-150 p-3.5 rounded-xl flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 leading-normal">
            <strong>Nota Importante:</strong> El servicio cubre la preparación total de tu trámite, formularios de embajada de USA/Canadá y adiestramiento de simulacro. Las tasas de solicitud consular (arancel directo que cobran las embajadas para procesar tu visa) no están cubiertas por agencias terceras y se pagan en la banca autorizada.
          </p>
        </div>

        {/* Call to action */}
        <div className="space-y-3">
          <button
            onClick={openWhatsApp}
            className="w-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4.5 h-4.5" />
            Reservar Mi Evaluación Gratis Hoy
          </button>
          <span className="text-[10px] text-gray-400 block text-center uppercase tracking-wider font-mono">
            ¡Evaluación inicial 100% Sin Costo!
          </span>
        </div>
      </div>
    </div>
  );
}

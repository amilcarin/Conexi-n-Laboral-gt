import { useState } from "react";
import { MapPin, Navigation, ToggleLeft, ShieldAlert, Sparkles, Car, Key, HelpCircle } from "lucide-react";

export default function EmbajadaMap() {
  const [selectedPin, setSelectedPin] = useState<"conexion" | "embajada" | "parqueo">("conexion");

  const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Boulevard+Austriaco+zona+16+Embajada+USA+Guatemala";

  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 overflow-hidden" id="embajada_map">
      <div className="p-6 pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-teal-400 text-[10px] font-bold tracking-widest uppercase font-mono block">
            Ubicación Premium 📍
          </span>
          <h3 className="text-lg font-bold tracking-tight mt-1">
            Frente a la Embajada de USA
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Boulevard Austriaco, Zona 16, Ciudad de Guatemala.
          </p>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all self-start cursor-pointer"
        >
          <Navigation className="w-4 h-4" />
          Cómo llegar en Waze o Maps
        </a>
      </div>

      {/* Interactive Map Canvas layout */}
      <div className="relative bg-slate-950 p-6 sm:p-8 flex items-center justify-center h-72 border-b border-slate-800 select-none overflow-hidden">
        {/* Abstract road background design */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-15 pointer-events-none">
          <div className="w-full h-px bg-white"></div>
          <div className="w-full h-px bg-white"></div>
          <div className="w-full h-px bg-white"></div>
        </div>

        {/* Boulevard road representation */}
        <div className="absolute h-14 bg-slate-900 w-full left-0 border-y border-dashed border-slate-700/50 flex items-center justify-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">
            ◄ Boulevard Austriaco, Zona 16 ►
          </span>
        </div>

        {/* Pin: United States Embassy */}
        <div
          onClick={() => setSelectedPin("embajada")}
          className={`absolute top-8 left-[15%] sm:left-[25%] p-2.5 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
            selectedPin === "embajada"
              ? "bg-red-950/80 border-red-500 text-red-200 scale-105 shadow-lg shadow-red-500/20"
              : "bg-slate-900/40 border-slate-800 text-slate-400 opacity-60 hover:opacity-90"
          }`}
        >
          <span className="text-xl">🇺🇸</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Embajada USA</span>
        </div>

        {/* Arrow road cross traffic */}
        <div className="absolute top-1/2 left-[48%] -translate-y-1/2 flex flex-col items-center opacity-40">
          <span className="text-xs text-teal-400">cruce</span>
          <span className="text-lg">↕</span>
        </div>

        {/* Pin: Conexión Laboral (Premium) */}
        <div
          onClick={() => setSelectedPin("conexion")}
          className={`absolute bottom-6 right-[15%] sm:right-[25%] p-3.5 rounded-xl border-2 flex flex-col items-center cursor-pointer transition-all ${
            selectedPin === "conexion"
              ? "bg-teal-950/90 border-teal-400 text-teal-200 scale-105 shadow-xl shadow-teal-500/10"
              : "bg-slate-900/40 border-slate-800 text-slate-400 opacity-60 hover:opacity-90"
          }`}
        >
          <div className="relative">
            <span className="text-2xl">🏢</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
          </div>
          <span className="text-[11px] font-extrabold mt-1 uppercase tracking-widest">Conexión Laboral</span>
          <span className="text-[8px] bg-teal-500/30 text-teal-300 border border-teal-500/40 px-1 py-0.2 rounded mt-0.5 font-bold">
            ESTAMOS AQUÍ
          </span>
        </div>

        {/* Pin: Parqueo Seguro */}
        <div
          onClick={() => setSelectedPin("parqueo")}
          className={`absolute bottom-[10%] left-[10%] sm:left-[15%] p-2 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
            selectedPin === "parqueo"
              ? "bg-emerald-950/90 border-emerald-500 text-emerald-200 scale-105"
              : "bg-slate-900/40 border-slate-800 text-slate-400 opacity-60 hover:opacity-90"
          }`}
        >
          <Car className="w-5 h-5 text-emerald-400" />
          <span className="text-[9px] font-bold mt-1">Parqueo Privado</span>
        </div>
      </div>

      {/* Location Details block */}
      <div className="p-5 sm:p-6 bg-slate-950/80">
        {selectedPin === "conexion" && (
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-teal-300 flex items-center gap-1.5">
              🏢 Conexión Laboral (Oficinas Centrales)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Estamos cruzando la calle de la embajada de USA. Contamos con salas climatizadas para simulacros consulares y el casillero de resguardo para guardar teléfonos inteligentes o bolsas que están prohibidas para ingresar a la cita de la embajada.
            </p>
            <div className="flex gap-2.5 pt-1.5">
              <span className="text-[10px] bg-teal-500/15 text-teal-300 px-2 py-1 rounded-md border border-teal-500/20 font-semibold flex items-center gap-1">
                <Car className="w-3 h-3" /> Parqueo Seguro
              </span>
              <span className="text-[10px] bg-teal-500/15 text-teal-300 px-2 py-1 rounded-md border border-teal-500/20 font-semibold flex items-center gap-1">
                <Key className="w-3 h-3" /> Casilleros de Seguridad
              </span>
            </div>
          </div>
        )}

        {selectedPin === "embajada" && (
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-red-400 flex items-center gap-1.5">
              🇺🇸 Embajada de los Estados Unidos (Zona 16)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              La sede consular principal de Guatemala. Queda exactamente cruzando la avenida desde nuestras oficinas. Sales de tu última preparación presencial directamente a hacer tu fila, de tal manera que tu entrevista esté completamente fresca e infunda confianza.
            </p>
            <p className="text-[10px] text-red-300/80">
              ⚠️ <i>Dato importante: no se permite ingresar teléfonos, llaveros electrónicos ni carteras grandes a la embajada.</i>
            </p>
          </div>
        )}

        {selectedPin === "parqueo" && (
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              🚗 Parqueo Seguro Reservado
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Muchos clientes viajan del interior (departamentos) y necesitan un lugar seguro donde dejar su carro mientras atienden a la asesoría o realizan su entrevista consular. Ponemos a disposición parqueo privado vigilado 24/7 sin costo adicional durante sus simulacros consulares.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

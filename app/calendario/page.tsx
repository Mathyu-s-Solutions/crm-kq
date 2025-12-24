'use client';

import { useState } from 'react';
import { Card, Button } from '@/components/ui';

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const vencimientos = [
  { dia: 15, tipo: 'PDT 621', cliente: 'Empresa ABC S.A.C.', color: 'bg-blue-500' },
  { dia: 15, tipo: 'PLAME', cliente: 'Comercial XYZ E.I.R.L.', color: 'bg-purple-500' },
  { dia: 17, tipo: 'Fraccionamiento', cliente: 'Servicios 123 S.A.', color: 'bg-orange-500' },
  { dia: 20, tipo: 'PDT 621', cliente: 'Inversiones DEF S.A.C.', color: 'bg-blue-500' },
  { dia: 24, tipo: 'Cobranza', cliente: 'Empresa ABC S.A.C.', color: 'bg-green-500' },
];

export default function CalendarioPage() {
  const [mesActual, setMesActual] = useState(0); // Enero 2025
  const [anioActual, setAnioActual] = useState(2025);

  const getDiasDelMes = (mes: number, anio: number) => {
    return new Date(anio, mes + 1, 0).getDate();
  };

  const getPrimerDia = (mes: number, anio: number) => {
    return new Date(anio, mes, 1).getDay();
  };

  const diasEnMes = getDiasDelMes(mesActual, anioActual);
  const primerDia = getPrimerDia(mesActual, anioActual);

  const cambiarMes = (direccion: number) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAnio = anioActual;
    
    if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAnio++;
    } else if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAnio--;
    }
    
    setMesActual(nuevoMes);
    setAnioActual(nuevoAnio);
  };

  const getVencimientosDia = (dia: number) => {
    return vencimientos.filter(v => v.dia === dia);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Calendario de Vencimientos</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendario */}
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={() => cambiarMes(-1)}>
              ← Anterior
            </Button>
            <h2 className="text-xl font-semibold">
              {meses[mesActual]} {anioActual}
            </h2>
            <Button variant="outline" size="sm" onClick={() => cambiarMes(1)}>
              Siguiente →
            </Button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {diasSemana.map((dia) => (
              <div key={dia} className="text-center text-sm font-medium text-text-muted py-2">
                {dia}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {/* Espacios vacíos antes del primer día */}
            {Array.from({ length: primerDia }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-24 bg-bg rounded-lg" />
            ))}
            
            {/* Días del mes */}
            {Array.from({ length: diasEnMes }).map((_, idx) => {
              const dia = idx + 1;
              const vencimientosDia = getVencimientosDia(dia);
              const esHoy = dia === 24 && mesActual === 11; // Ejemplo: hoy es 24 dic
              
              return (
                <div
                  key={dia}
                  className={`h-24 p-2 rounded-lg border ${
                    esHoy ? 'border-primary bg-primary/5' : 'border-border bg-bg-white'
                  } hover:border-primary transition-colors cursor-pointer`}
                >
                  <span className={`text-sm font-medium ${esHoy ? 'text-primary' : ''}`}>
                    {dia}
                  </span>
                  <div className="mt-1 space-y-1">
                    {vencimientosDia.slice(0, 2).map((v, i) => (
                      <div
                        key={i}
                        className={`text-xs text-white px-1 py-0.5 rounded truncate ${v.color}`}
                        title={`${v.tipo} - ${v.cliente}`}
                      >
                        {v.tipo}
                      </div>
                    ))}
                    {vencimientosDia.length > 2 && (
                      <div className="text-xs text-text-muted">
                        +{vencimientosDia.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Panel lateral */}
        <div className="space-y-4">
          <Card title="Leyenda">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">PDT 621</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm">PLAME</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm">Fraccionamientos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Cobranzas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm">Multas</span>
              </div>
            </div>
          </Card>

          <Card title="Próximos Vencimientos">
            <div className="space-y-3">
              {vencimientos.map((v, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 bg-bg rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${v.color}`} />
                  <div>
                    <p className="text-sm font-medium">{v.tipo}</p>
                    <p className="text-xs text-text-muted">{v.cliente}</p>
                    <p className="text-xs text-text-muted">Día {v.dia}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

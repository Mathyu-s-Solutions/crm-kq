'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight, FileText, Wallet, CreditCard, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const diasSemanaFull = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const vencimientos = [
  { dia: 15, tipo: 'PDT 621', cliente: 'Empresa ABC S.A.C.', categoria: 'declaracion' },
  { dia: 15, tipo: 'PDT 621', cliente: 'Inversiones DEF S.A.C.', categoria: 'declaracion' },
  { dia: 17, tipo: 'PLAME', cliente: 'Empresa ABC S.A.C.', categoria: 'declaracion' },
  { dia: 20, tipo: 'Fraccionamiento', cliente: 'Comercial XYZ', categoria: 'tributo', monto: 'S/ 500' },
  { dia: 24, tipo: 'Cobranza', cliente: 'Todos', categoria: 'cobranza' },
];

const categoriaConfig = {
  declaracion: { icon: FileText, color: 'bg-blue-500', label: 'Declaración' },
  tributo: { icon: Wallet, color: 'bg-orange-500', label: 'Tributo' },
  cobranza: { icon: CreditCard, color: 'bg-green-500', label: 'Cobranza' },
};

export default function CalendarioPage() {
  const [mesActual, setMesActual] = useState(0);
  const [anioActual, setAnioActual] = useState(2025);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);

  const getDiasDelMes = (mes: number, anio: number) => new Date(anio, mes + 1, 0).getDate();
  const getPrimerDia = (mes: number, anio: number) => new Date(anio, mes, 1).getDay();

  const diasEnMes = getDiasDelMes(mesActual, anioActual);
  const primerDia = getPrimerDia(mesActual, anioActual);

  const cambiarMes = (direccion: number) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAnio = anioActual;
    if (nuevoMes > 11) { nuevoMes = 0; nuevoAnio++; }
    else if (nuevoMes < 0) { nuevoMes = 11; nuevoAnio--; }
    setMesActual(nuevoMes);
    setAnioActual(nuevoAnio);
    setDiaSeleccionado(null);
  };

  const getVencimientosDia = (dia: number) => vencimientos.filter(v => v.dia === dia);
  const vencimientosDelDia = diaSeleccionado ? getVencimientosDia(diaSeleccionado) : [];

  const hoy = new Date();
  const esHoy = (dia: number) => dia === hoy.getDate() && mesActual === hoy.getMonth() && anioActual === hoy.getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Calendario" subtitle="Vencimientos" />
      
      <div className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Calendario */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => cambiarMes(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-base sm:text-xl">
                  {meses[mesActual]} {anioActual}
                </CardTitle>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => cambiarMes(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-1 sm:mb-2">
                {diasSemanaFull.map((_, i) => (
                  <div key={i} className="text-center text-xs sm:text-sm font-medium text-muted-foreground py-1 sm:py-2">
                    <span className="sm:hidden">{diasSemana[i]}</span>
                    <span className="hidden sm:inline">{diasSemanaFull[i]}</span>
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: primerDia }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="aspect-square sm:h-20 lg:h-24 rounded-lg bg-muted/30" />
                ))}
                
                {Array.from({ length: diasEnMes }).map((_, idx) => {
                  const dia = idx + 1;
                  const vencimientosDia = getVencimientosDia(dia);
                  const tieneVencimientos = vencimientosDia.length > 0;
                  const esSeleccionado = diaSeleccionado === dia;
                  
                  return (
                    <button
                      key={dia}
                      onClick={() => setDiaSeleccionado(dia)}
                      className={cn(
                        'aspect-square sm:h-20 lg:h-24 p-1 sm:p-2 rounded-lg border text-left transition-all hover:border-primary flex flex-col',
                        esHoy(dia) && 'ring-2 ring-primary ring-offset-1',
                        esSeleccionado && 'border-primary bg-primary/5',
                        !tieneVencimientos && 'bg-card',
                        tieneVencimientos && 'bg-muted/50'
                      )}
                    >
                      <span className={cn('text-xs sm:text-sm font-medium', esHoy(dia) && 'text-primary')}>
                        {dia}
                      </span>
                      <div className="flex-1 flex flex-col justify-end gap-0.5 mt-0.5 overflow-hidden">
                        {vencimientosDia.slice(0, 2).map((v, i) => {
                          const config = categoriaConfig[v.categoria as keyof typeof categoriaConfig];
                          return (
                            <div key={i} className={cn('text-[8px] sm:text-[10px] text-white px-1 py-0.5 rounded truncate', config.color)}>
                              <span className="hidden sm:inline">{v.tipo}</span>
                              <span className="sm:hidden">•</span>
                            </div>
                          );
                        })}
                        {vencimientosDia.length > 2 && (
                          <div className="text-[8px] sm:text-[10px] text-muted-foreground font-medium">
                            +{vencimientosDia.length - 2}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Panel lateral */}
          <div className="space-y-4">
            {/* Leyenda */}
            <Card>
              <CardHeader className="pb-2 px-4">
                <CardTitle className="text-sm">Leyenda</CardTitle>
              </CardHeader>
              <CardContent className="px-4 space-y-2">
                {Object.entries(categoriaConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <div className={cn('h-3 w-3 rounded-full', config.color)} />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{config.label}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Detalle del día */}
            <Card>
              <CardHeader className="pb-2 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {diaSeleccionado ? `${diaSeleccionado} de ${meses[mesActual]}` : 'Selecciona un día'}
                </CardTitle>
                {diaSeleccionado && (
                  <CardDescription>{vencimientosDelDia.length} vencimiento(s)</CardDescription>
                )}
              </CardHeader>
              <CardContent className="px-4">
                {diaSeleccionado ? (
                  <ScrollArea className="h-[200px] sm:h-[250px] pr-4">
                    {vencimientosDelDia.length > 0 ? (
                      <div className="space-y-3">
                        {vencimientosDelDia.map((v, idx) => {
                          const config = categoriaConfig[v.categoria as keyof typeof categoriaConfig];
                          const Icon = config.icon;
                          return (
                            <div key={idx} className="p-3 rounded-lg bg-muted/50 space-y-2">
                              <div className="flex items-center gap-2">
                                <div className={cn('h-6 w-6 rounded flex items-center justify-center', config.color)}>
                                  <Icon className="h-3 w-3 text-white" />
                                </div>
                                <span className="font-medium text-sm">{v.tipo}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{v.cliente}</p>
                              {v.monto && <Badge variant="outline">{v.monto}</Badge>}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Clock className="h-8 w-8 text-muted-foreground/50 mb-2" />
                        <p className="text-sm text-muted-foreground">Sin vencimientos</p>
                      </div>
                    )}
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">Haz clic en un día</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

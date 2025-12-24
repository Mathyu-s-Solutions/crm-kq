'use client';

import { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  Pencil,
  Phone,
  Mail,
  Building2,
  FileText,
  Wallet,
  Briefcase,
  CreditCard,
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Plus,
  ExternalLink,
} from 'lucide-react';

const clienteEjemplo = {
  id: '1',
  ruc: '20123456789',
  razonSocial: 'Empresa ABC S.A.C.',
  titulares: ['Juan Pérez', 'María López'],
  email: 'contacto@empresaabc.com',
  telefono: '999888777',
  direccion: 'Av. Principal 123, Lima',
  regimenTributario: 'MYPE',
  regimenLaboral: 'PEQUEÑA',
  otrosRegistros: 'Registro REMYPE vigente hasta 2026',
  planServicio: 'ESTANDAR',
  fechaCreacion: new Date('2024-01-15'),
  activo: true,
  asesoriasUsadas: 2,
  asesoriasDisponibles: 4,
};

const interacciones = [
  { id: 1, fecha: '10 Ene 2025', tipo: 'CONSULTA', descripcion: 'Consulta sobre declaración mensual de enero', responsable: 'Ana Torres', rol: 'Contador' },
  { id: 2, fecha: '05 Ene 2025', tipo: 'GESTION', descripcion: 'Presentación PDT 621 diciembre 2024', responsable: 'Carlos Ruiz', rol: 'Asistente' },
  { id: 3, fecha: '20 Dic 2024', tipo: 'ASESORIA', descripcion: 'Asesoría tributaria - Planificación fiscal 2025', responsable: 'Ana Torres', rol: 'Contador' },
  { id: 4, fecha: '15 Dic 2024', tipo: 'COMENTARIO', descripcion: 'Cliente solicita información sobre fraccionamiento', responsable: 'Carlos Ruiz', rol: 'Asistente' },
];

const declaraciones = [
  { periodo: 'Enero 2025', tipo: 'PDT 621', estado: 'PENDIENTE', vencimiento: '15 Feb 2025' },
  { periodo: 'Enero 2025', tipo: 'PLAME', estado: 'PENDIENTE', vencimiento: '17 Feb 2025' },
  { periodo: 'Diciembre 2024', tipo: 'PDT 621', estado: 'PRESENTADO', fechaPresentacion: '12 Ene 2025' },
  { periodo: 'Diciembre 2024', tipo: 'PLAME', estado: 'PRESENTADO', fechaPresentacion: '14 Ene 2025' },
];

const tributos = [
  { tipo: 'Fraccionamiento Art. 36', monto: 'S/ 500', vencimiento: '20 Ene 2025', cuota: '9/24' },
  { tipo: 'IGV Enero', monto: 'S/ 1,200', vencimiento: '17 Feb 2025', cuota: '-' },
];

const cobranzas = [
  { periodo: 'Diciembre 2024', monto: 'S/ 850', estado: 'PAGADO', fecha: '25 Dic 2024' },
  { periodo: 'Noviembre 2024', monto: 'S/ 850', estado: 'PAGADO', fecha: '25 Nov 2024' },
];

export default function ClienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const tipoIcono = {
    CONSULTA: MessageSquare,
    GESTION: FileText,
    ASESORIA: Briefcase,
    COMENTARIO: Clock,
  };

  const tipoColor = {
    CONSULTA: 'bg-blue-100 text-blue-600',
    GESTION: 'bg-green-100 text-green-600',
    ASESORIA: 'bg-purple-100 text-purple-600',
    COMENTARIO: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={clienteEjemplo.razonSocial}
        subtitle={`RUC: ${clienteEjemplo.ruc}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/clientes/${id}/editar`} className="gap-2">
                <Pencil className="h-4 w-4" />
                Editar
              </Link>
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Interacción
            </Button>
          </div>
        }
      />
      
      <div className="flex-1 p-4 sm:p-6">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/clientes" className="gap-2 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Volver a clientes
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Columna izquierda - Info del cliente */}
          <div className="space-y-4 sm:space-y-6">
            {/* Tarjeta de perfil */}
            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mb-3 sm:mb-4">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl sm:text-2xl font-bold">
                      EA
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-base sm:text-lg">{clienteEjemplo.razonSocial}</h2>
                  <Badge variant="outline" className="mt-2 bg-emerald-50 text-emerald-700 border-emerald-200">
                    Cliente Activo
                  </Badge>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">RUC</p>
                      <p className="font-mono font-medium text-sm">{clienteEjemplo.ruc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Teléfono</p>
                      <p className="font-medium text-sm">{clienteEjemplo.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-xs">Email</p>
                      <p className="font-medium text-sm truncate">{clienteEjemplo.email}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div className="p-2 sm:p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Régimen Tributario</p>
                    <Badge className="mt-1 bg-violet-100 text-violet-700 text-xs">
                      {clienteEjemplo.regimenTributario}
                    </Badge>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <Badge className="mt-1 bg-blue-100 text-blue-700 text-xs">
                      {clienteEjemplo.planServicio}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asesorías */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Asesorías del Mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl sm:text-2xl font-bold">{clienteEjemplo.asesoriasUsadas}</span>
                  <span className="text-muted-foreground text-sm">de {clienteEjemplo.asesoriasDisponibles}</span>
                </div>
                <Progress 
                  value={(clienteEjemplo.asesoriasUsadas / clienteEjemplo.asesoriasDisponibles) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {clienteEjemplo.asesoriasDisponibles - clienteEjemplo.asesoriasUsadas} asesorías disponibles
                </p>
              </CardContent>
            </Card>

            {/* Accesos rápidos */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm sm:text-base">Accesos Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start gap-2 h-auto py-2 sm:py-3">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-xs">SUNAT</span>
                </Button>
                <Button variant="outline" size="sm" className="justify-start gap-2 h-auto py-2 sm:py-3">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="text-xs">AFP</span>
                </Button>
                <Button variant="outline" size="sm" className="justify-start gap-2 h-auto py-2 sm:py-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs">Ventas</span>
                </Button>
                <Button variant="outline" size="sm" className="justify-start gap-2 h-auto py-2 sm:py-3">
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <span className="text-xs">Drive</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="historial" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-auto">
                <TabsTrigger value="historial" className="text-xs sm:text-sm py-2">Historial</TabsTrigger>
                <TabsTrigger value="declaraciones" className="text-xs sm:text-sm py-2">Declaraciones</TabsTrigger>
                <TabsTrigger value="tributos" className="text-xs sm:text-sm py-2">Tributos</TabsTrigger>
                <TabsTrigger value="cobranzas" className="text-xs sm:text-sm py-2">Cobranzas</TabsTrigger>
              </TabsList>

              <TabsContent value="historial" className="mt-4">
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base">Historial de Interacciones</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Registro de todas las gestiones realizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
                      <div className="space-y-3 sm:space-y-4">
                        {interacciones.map((item) => {
                          const Icon = tipoIcono[item.tipo as keyof typeof tipoIcono];
                          const color = tipoColor[item.tipo as keyof typeof tipoColor];
                          return (
                            <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1 gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {item.tipo}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground shrink-0">{item.fecha}</span>
                                </div>
                                <p className="text-xs sm:text-sm">{item.descripcion}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.responsable} • {item.rol}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="declaraciones" className="mt-4">
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base">Declaraciones</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Estado de declaraciones mensuales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {declaraciones.map((dec, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 ${
                              dec.estado === 'PRESENTADO' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {dec.estado === 'PRESENTADO' ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{dec.tipo}</p>
                              <p className="text-xs text-muted-foreground">{dec.periodo}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right ml-11 sm:ml-0">
                            <Badge variant={dec.estado === 'PRESENTADO' ? 'default' : 'secondary'} className="text-xs">
                              {dec.estado === 'PRESENTADO' ? 'Presentado' : 'Pendiente'}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {dec.estado === 'PRESENTADO' ? dec.fechaPresentacion : `Vence: ${dec.vencimiento}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tributos" className="mt-4">
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base">Tributos Pendientes</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Cronograma de pagos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tributos.map((trib, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border gap-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                              <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{trib.tipo}</p>
                              <p className="text-xs text-muted-foreground">Cuota: {trib.cuota}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right ml-11 sm:ml-0">
                            <p className="font-semibold text-sm">{trib.monto}</p>
                            <p className="text-xs text-muted-foreground">Vence: {trib.vencimiento}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cobranzas" className="mt-4">
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base">Historial de Cobranzas</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Pagos de servicios contables</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cobranzas.map((cob, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border gap-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{cob.periodo}</p>
                              <p className="text-xs text-muted-foreground">Pagado: {cob.fecha}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right ml-11 sm:ml-0 flex items-center gap-2 sm:flex-col sm:items-end">
                            <p className="font-semibold text-sm">{cob.monto}</p>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                              {cob.estado}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

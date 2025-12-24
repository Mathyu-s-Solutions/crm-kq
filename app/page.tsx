'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import StatsCard from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  FileText,
  Wallet,
  CreditCard,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Calendar,
  UserPlus,
  FileCheck,
  Briefcase,
} from 'lucide-react';

const stats = [
  { title: 'Clientes Activos', value: '45', icon: Users, variant: 'primary' as const, trend: { value: 12, isPositive: true } },
  { title: 'Declaraciones Pendientes', value: '12', icon: FileText, variant: 'warning' as const, description: 'Este mes' },
  { title: 'Tributos por Vencer', value: '8', icon: Wallet, variant: 'destructive' as const, description: 'Próximos 7 días' },
  { title: 'Cobranzas Pendientes', value: 'S/ 4,250', icon: CreditCard, variant: 'default' as const, description: '15 clientes' },
];

const proximosVencimientos = [
  { cliente: 'Empresa ABC S.A.C.', tipo: 'PDT 621', fecha: '15 Ene', diasRestantes: 3, estado: 'pendiente' },
  { cliente: 'Comercial XYZ E.I.R.L.', tipo: 'PLAME', fecha: '17 Ene', diasRestantes: 5, estado: 'en_proceso' },
  { cliente: 'Servicios 123 S.A.', tipo: 'Fraccionamiento', fecha: '20 Ene', diasRestantes: 8, estado: 'pendiente' },
  { cliente: 'Inversiones DEF S.A.C.', tipo: 'PDT 621', fecha: '15 Ene', diasRestantes: 3, estado: 'presentado' },
];

const alertas = [
  { tipo: 'warning', titulo: 'Tope de ventas próximo', descripcion: 'Empresa ABC está al 85% del tope RUS', accion: 'Ver cliente' },
  { tipo: 'destructive', titulo: 'Cobranzas vencidas', descripcion: '3 clientes con pagos pendientes por S/ 1,850', accion: 'Ver cobranzas' },
  { tipo: 'info', titulo: 'Asesorías agotadas', descripcion: '2 clientes han usado todas sus asesorías', accion: 'Ver detalle' },
];

const actividadReciente = [
  { accion: 'Declaración presentada', cliente: 'Empresa ABC S.A.C.', tipo: 'PDT 621', tiempo: 'Hace 2 horas', icono: FileCheck },
  { accion: 'Nuevo cliente registrado', cliente: 'Tech Solutions S.A.C.', tipo: 'Plan Premium', tiempo: 'Hace 5 horas', icono: UserPlus },
  { accion: 'Asesoría completada', cliente: 'Comercial XYZ E.I.R.L.', tipo: '45 min', tiempo: 'Ayer', icono: Briefcase },
  { accion: 'Pago registrado', cliente: 'Servicios 123 S.A.', tipo: 'S/ 850', tiempo: 'Ayer', icono: CheckCircle2 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Dashboard" 
        subtitle="Bienvenido de vuelta, Alessandro"
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Próximos Vencimientos */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-semibold">Próximos Vencimientos</CardTitle>
                <CardDescription>Declaraciones y tributos por vencer</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/calendario" className="gap-1">
                  Ver calendario <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proximosVencimientos.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        item.diasRestantes <= 3 ? 'bg-destructive/10 text-destructive' :
                        item.diasRestantes <= 7 ? 'bg-warning/10 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.cliente}</p>
                        <p className="text-xs text-muted-foreground">{item.tipo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.fecha}</p>
                        <p className={`text-xs ${
                          item.diasRestantes <= 3 ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          {item.diasRestantes} días
                        </p>
                      </div>
                      <Badge variant={
                        item.estado === 'presentado' ? 'default' :
                        item.estado === 'en_proceso' ? 'secondary' : 'outline'
                      }>
                        {item.estado === 'presentado' ? 'Presentado' :
                         item.estado === 'en_proceso' ? 'En proceso' : 'Pendiente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Alertas
              </CardTitle>
              <CardDescription>Requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                <div className="space-y-3">
                  {alertas.map((alerta, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-l-4 ${
                        alerta.tipo === 'destructive' ? 'bg-destructive/5 border-destructive' :
                        alerta.tipo === 'warning' ? 'bg-warning/5 border-warning' :
                        'bg-info/5 border-info'
                      }`}
                    >
                      <p className="font-medium text-sm">{alerta.titulo}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alerta.descripcion}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-xs">
                        {alerta.accion} →
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Acciones Rápidas */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/clientes/nuevo">
                    <UserPlus className="h-5 w-5 text-primary" />
                    <span className="text-xs">Nuevo Cliente</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/asesorias/nueva">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-xs">Agendar Asesoría</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/declaraciones">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-xs">Declaraciones</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/reportes">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-xs">Reportes</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resumen del Mes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Resumen del Mes</CardTitle>
              <CardDescription>Enero 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Declaraciones</span>
                  <span className="font-medium">42/50</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Cobranzas</span>
                  <span className="font-medium">38/45</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Asesorías</span>
                  <span className="font-medium">25/32</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Actividad Reciente */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-4">
                  {actividadReciente.map((item, idx) => {
                    const Icon = item.icono;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.accion}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.cliente}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.tiempo}</span>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

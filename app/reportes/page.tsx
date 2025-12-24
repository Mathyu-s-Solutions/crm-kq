'use client';

import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Download,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  Briefcase,
  BarChart3,
} from 'lucide-react';

const clientesPorPlan = [
  { plan: 'Básico', cantidad: 15, porcentaje: 33, color: 'bg-slate-500' },
  { plan: 'Estándar', cantidad: 18, porcentaje: 40, color: 'bg-blue-500' },
  { plan: 'Premium', cantidad: 10, porcentaje: 22, color: 'bg-purple-500' },
  { plan: 'Enterprise', cantidad: 2, porcentaje: 5, color: 'bg-amber-500' },
];

const clientesPorRegimen = [
  { regimen: 'RUS', cantidad: 12, porcentaje: 27, color: 'bg-emerald-500' },
  { regimen: 'RER', cantidad: 8, porcentaje: 18, color: 'bg-blue-500' },
  { regimen: 'MYPE', cantidad: 15, porcentaje: 33, color: 'bg-violet-500' },
  { regimen: 'General', cantidad: 10, porcentaje: 22, color: 'bg-amber-500' },
];

const alertas = [
  { tipo: 'warning', titulo: 'Clientes cerca del tope', cantidad: 3, descripcion: 'RUS al 80%+ del tope de ventas' },
  { tipo: 'destructive', titulo: 'Cobranzas vencidas', cantidad: 4, descripcion: 'S/ 1,850 pendiente' },
  { tipo: 'info', titulo: 'Vencimientos próximos', cantidad: 12, descripcion: 'En los próximos 7 días' },
  { tipo: 'warning', titulo: 'Asesorías agotadas', cantidad: 2, descripcion: 'Clientes sin cupo disponible' },
];

export default function ReportesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Reportes"
        subtitle="Análisis y métricas del negocio"
        actions={
          <div className="flex gap-2">
            <Select defaultValue="2025-01">
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">Enero 2025</SelectItem>
                <SelectItem value="2024-12">Diciembre 2024</SelectItem>
                <SelectItem value="2024-11">Noviembre 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        }
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* KPIs principales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-muted-foreground">Clientes Activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">Declaraciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-xs text-muted-foreground">Asesorías</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">S/ 38.5k</p>
                  <p className="text-xs text-muted-foreground">Cobranzas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribución por Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Distribución por Plan
              </CardTitle>
              <CardDescription>Clientes según plan de servicio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientesPorPlan.map((item) => (
                <div key={item.plan}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.plan}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.cantidad} clientes ({item.porcentaje}%)
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${item.color}`}
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-medium">Total Clientes</span>
                <span className="text-xl font-bold">45</span>
              </div>
            </CardContent>
          </Card>

          {/* Distribución por Régimen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Distribución por Régimen
              </CardTitle>
              <CardDescription>Clientes según régimen tributario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientesPorRegimen.map((item) => (
                <div key={item.regimen}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium">{item.regimen}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.cantidad} ({item.porcentaje}%)
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${item.color}`}
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Estado de Declaraciones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Estado de Declaraciones</CardTitle>
              <CardDescription>Enero 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                  <p className="text-xs text-muted-foreground">Pendientes</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">5</p>
                  <p className="text-xs text-muted-foreground">En Proceso</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">42</p>
                  <p className="text-xs text-muted-foreground">Presentadas</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progreso del mes</span>
                  <span className="font-medium">76%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                  <div className="bg-green-500 h-full" style={{ width: '76%' }} />
                  <div className="bg-blue-500 h-full" style={{ width: '9%' }} />
                  <div className="bg-yellow-500 h-full" style={{ width: '15%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado de Cobranzas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Estado de Cobranzas</CardTitle>
              <CardDescription>Diciembre 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xl font-bold text-yellow-600">S/ 2,100</p>
                  <p className="text-xs text-muted-foreground">Pendiente</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-xl font-bold text-red-600">S/ 1,850</p>
                  <p className="text-xs text-muted-foreground">Vencido</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xl font-bold text-green-600">S/ 38,500</p>
                  <p className="text-xs text-muted-foreground">Cobrado</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tasa de cobro</span>
                  <div className="flex items-center gap-2">
                    <Progress value={91} className="w-24 h-2" />
                    <span className="font-bold text-green-600">91%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas y Pendientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Alertas y Pendientes
            </CardTitle>
            <CardDescription>Situaciones que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {alertas.map((alerta, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    alerta.tipo === 'destructive' ? 'bg-red-50 border-red-500' :
                    alerta.tipo === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold text-sm ${
                      alerta.tipo === 'destructive' ? 'text-red-700' :
                      alerta.tipo === 'warning' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {alerta.titulo}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {alerta.cantidad}
                    </Badge>
                  </div>
                  <p className={`text-xs ${
                    alerta.tipo === 'destructive' ? 'text-red-600' :
                    alerta.tipo === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`}>
                    {alerta.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

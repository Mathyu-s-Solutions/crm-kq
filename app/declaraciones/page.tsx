'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileText,
  Clock,
  CheckCircle2,
  Loader2,
  MoreHorizontal,
  Filter,
  Download,
  ChevronDown,
} from 'lucide-react';

const declaraciones = [
  { id: '1', cliente: 'Empresa ABC S.A.C.', ruc: '20123456789', tipo: 'PDT 621', periodo: '2025-01', estado: 'PENDIENTE', vencimiento: '15 Feb 2025' },
  { id: '2', cliente: 'Empresa ABC S.A.C.', ruc: '20123456789', tipo: 'PLAME', periodo: '2025-01', estado: 'EN_PROCESO', vencimiento: '17 Feb 2025' },
  { id: '3', cliente: 'Comercial XYZ E.I.R.L.', ruc: '20987654321', tipo: 'NRUS', periodo: '2025-01', estado: 'PENDIENTE', vencimiento: '20 Feb 2025' },
  { id: '4', cliente: 'Servicios 123 S.A.', ruc: '20456789123', tipo: 'PDT 621', periodo: '2025-01', estado: 'PRESENTADO', fechaPresentacion: '10 Ene 2025' },
  { id: '5', cliente: 'Servicios 123 S.A.', ruc: '20456789123', tipo: 'PLAME', periodo: '2025-01', estado: 'PRESENTADO', fechaPresentacion: '12 Ene 2025' },
  { id: '6', cliente: 'Inversiones DEF S.A.C.', ruc: '20111222333', tipo: 'PDT 621', periodo: '2025-01', estado: 'PENDIENTE', vencimiento: '15 Feb 2025' },
  { id: '7', cliente: 'Tech Solutions S.A.C.', ruc: '20444555666', tipo: 'PDT 621', periodo: '2025-01', estado: 'EN_PROCESO', vencimiento: '15 Feb 2025' },
];

const estadoConfig = {
  PENDIENTE: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  EN_PROCESO: { label: 'En Proceso', icon: Loader2, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  PRESENTADO: { label: 'Presentado', icon: CheckCircle2, color: 'bg-green-100 text-green-700 border-green-200' },
};

export default function DeclaracionesPage() {
  const [filtros, setFiltros] = useState({
    periodo: '2025-01',
    tipo: 'all',
    estado: 'all',
  });

  const declaracionesFiltradas = declaraciones.filter((d) => {
    const matchPeriodo = d.periodo === filtros.periodo;
    const matchTipo = filtros.tipo === 'all' || d.tipo === filtros.tipo;
    const matchEstado = filtros.estado === 'all' || d.estado === filtros.estado;
    return matchPeriodo && matchTipo && matchEstado;
  });

  const contadores = {
    pendientes: declaracionesFiltradas.filter(d => d.estado === 'PENDIENTE').length,
    enProceso: declaracionesFiltradas.filter(d => d.estado === 'EN_PROCESO').length,
    presentados: declaracionesFiltradas.filter(d => d.estado === 'PRESENTADO').length,
    total: declaracionesFiltradas.length,
  };

  const porcentajeCompletado = contadores.total > 0 
    ? Math.round((contadores.presentados / contadores.total) * 100) 
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Declaraciones"
        subtitle="Gestión de declaraciones mensuales"
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{contadores.pendientes}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En Proceso</p>
                  <p className="text-2xl font-bold text-blue-600">{contadores.enProceso}</p>
                </div>
                <Loader2 className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Presentados</p>
                  <p className="text-2xl font-bold text-green-600">{contadores.presentados}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Progreso del Mes</p>
              <div className="flex items-center gap-3">
                <Progress value={porcentajeCompletado} className="flex-1 h-3" />
                <span className="text-lg font-bold">{porcentajeCompletado}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>
              <Select value={filtros.periodo} onValueChange={(v) => setFiltros({...filtros, periodo: v})}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01">Enero 2025</SelectItem>
                  <SelectItem value="2024-12">Diciembre 2024</SelectItem>
                  <SelectItem value="2024-11">Noviembre 2024</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtros.tipo} onValueChange={(v) => setFiltros({...filtros, tipo: v})}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="PDT 621">PDT 621</SelectItem>
                  <SelectItem value="PLAME">PLAME</SelectItem>
                  <SelectItem value="NRUS">NRUS</SelectItem>
                  <SelectItem value="RENTA_4TA">Renta 4ta</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtros.estado} onValueChange={(v) => setFiltros({...filtros, estado: v})}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="EN_PROCESO">En Proceso</SelectItem>
                  <SelectItem value="PRESENTADO">Presentado</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Cliente</TableHead>
                  <TableHead>RUC</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Periodo</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {declaracionesFiltradas.map((dec) => {
                  const config = estadoConfig[dec.estado as keyof typeof estadoConfig];
                  const Icon = config.icon;
                  return (
                    <TableRow key={dec.id}>
                      <TableCell>
                        <Link href={`/clientes/${dec.id}`} className="font-medium hover:text-primary transition-colors">
                          {dec.cliente}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{dec.ruc}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{dec.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{dec.periodo}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {dec.estado === 'PRESENTADO' ? dec.fechaPresentacion : dec.vencimiento}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className={`gap-1 ${config.color} border`}>
                              <Icon className="h-3 w-3" />
                              {config.label}
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                              Pendiente
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Loader2 className="h-4 w-4 mr-2 text-blue-600" />
                              En Proceso
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                              Presentado
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalle</DropdownMenuItem>
                            <DropdownMenuItem>Ver cliente</DropdownMenuItem>
                            <DropdownMenuItem>Agregar nota</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

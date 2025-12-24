'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileText, Clock, CheckCircle2, Loader2, MoreHorizontal, Filter, ChevronDown } from 'lucide-react';

const declaraciones = [
  { id: '1', cliente: 'Empresa ABC S.A.C.', ruc: '20123456789', tipo: 'PDT 621', periodo: '2025-01', estado: 'PENDIENTE', vencimiento: '15 Feb' },
  { id: '2', cliente: 'Empresa ABC S.A.C.', ruc: '20123456789', tipo: 'PLAME', periodo: '2025-01', estado: 'EN_PROCESO', vencimiento: '17 Feb' },
  { id: '3', cliente: 'Comercial XYZ E.I.R.L.', ruc: '20987654321', tipo: 'NRUS', periodo: '2025-01', estado: 'PENDIENTE', vencimiento: '20 Feb' },
  { id: '4', cliente: 'Servicios 123 S.A.', ruc: '20456789123', tipo: 'PDT 621', periodo: '2025-01', estado: 'PRESENTADO', fechaPresentacion: '10 Ene' },
];

const estadoConfig = {
  PENDIENTE: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  EN_PROCESO: { label: 'En Proceso', icon: Loader2, color: 'bg-blue-100 text-blue-700' },
  PRESENTADO: { label: 'Presentado', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
};

export default function DeclaracionesPage() {
  const [filtros, setFiltros] = useState({ periodo: '2025-01', estado: 'all' });

  const declaracionesFiltradas = declaraciones.filter((d) => {
    const matchPeriodo = d.periodo === filtros.periodo;
    const matchEstado = filtros.estado === 'all' || d.estado === filtros.estado;
    return matchPeriodo && matchEstado;
  });

  const contadores = {
    pendientes: declaracionesFiltradas.filter(d => d.estado === 'PENDIENTE').length,
    enProceso: declaracionesFiltradas.filter(d => d.estado === 'EN_PROCESO').length,
    presentados: declaracionesFiltradas.filter(d => d.estado === 'PRESENTADO').length,
    total: declaracionesFiltradas.length,
  };

  const porcentaje = contadores.total > 0 ? Math.round((contadores.presentados / contadores.total) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Declaraciones" subtitle="Gestión mensual" />
      
      <div className="flex-1 p-4 sm:p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-600">{contadores.pendientes}</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">En Proceso</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{contadores.enProceso}</p>
                </div>
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Presentados</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">{contadores.presentados}</p>
                </div>
                <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 lg:col-span-1">
            <CardContent className="p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">Progreso</p>
              <div className="flex items-center gap-3">
                <Progress value={porcentaje} className="flex-1 h-2 sm:h-3" />
                <span className="text-lg sm:text-xl font-bold">{porcentaje}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={filtros.periodo} onValueChange={(v) => setFiltros({...filtros, periodo: v})}>
                <SelectTrigger className="w-full sm:w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01">Enero 2025</SelectItem>
                  <SelectItem value="2024-12">Diciembre 2024</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtros.estado} onValueChange={(v) => setFiltros({...filtros, estado: v})}>
                <SelectTrigger className="w-full sm:w-[140px]"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="EN_PROCESO">En Proceso</SelectItem>
                  <SelectItem value="PRESENTADO">Presentado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Mobile: Card list */}
        <div className="space-y-3 sm:hidden">
          {declaracionesFiltradas.map((dec) => {
            const config = estadoConfig[dec.estado as keyof typeof estadoConfig];
            return (
              <Card key={dec.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/clientes/${dec.id}`} className="font-medium text-sm hover:text-primary block truncate">
                        {dec.cliente}
                      </Link>
                      <p className="text-xs text-muted-foreground">{dec.tipo} • {dec.periodo}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className={`gap-1 ${config.color} border`}>
                          {config.label}
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem><Clock className="h-4 w-4 mr-2" />Pendiente</DropdownMenuItem>
                        <DropdownMenuItem><Loader2 className="h-4 w-4 mr-2" />En Proceso</DropdownMenuItem>
                        <DropdownMenuItem><CheckCircle2 className="h-4 w-4 mr-2" />Presentado</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {dec.estado === 'PRESENTADO' ? `Presentado: ${dec.fechaPresentacion}` : `Vence: ${dec.vencimiento}`}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Desktop: Table */}
        <Card className="hidden sm:block">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">RUC</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="hidden lg:table-cell">Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {declaracionesFiltradas.map((dec) => {
                  const config = estadoConfig[dec.estado as keyof typeof estadoConfig];
                  return (
                    <TableRow key={dec.id}>
                      <TableCell>
                        <Link href={`/clientes/${dec.id}`} className="font-medium hover:text-primary">
                          {dec.cliente}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{dec.ruc}</code>
                      </TableCell>
                      <TableCell><Badge variant="outline">{dec.tipo}</Badge></TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {dec.estado === 'PRESENTADO' ? dec.fechaPresentacion : dec.vencimiento}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className={`gap-1 ${config.color} border`}>
                              {config.label}
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem><Clock className="h-4 w-4 mr-2" />Pendiente</DropdownMenuItem>
                            <DropdownMenuItem><Loader2 className="h-4 w-4 mr-2" />En Proceso</DropdownMenuItem>
                            <DropdownMenuItem><CheckCircle2 className="h-4 w-4 mr-2" />Presentado</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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

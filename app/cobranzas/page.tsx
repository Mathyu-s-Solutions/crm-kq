'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Search,
  Filter,
  Download,
  Clock,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Info,
} from 'lucide-react';

const cobranzas = [
  { id: '1', cliente: 'Empresa ABC S.A.C.', ruc: '20123456789', periodo: 'Diciembre 2024', monto: 850, fechaEmision: '24 Dic 2024', fechaVencimiento: '27 Dic 2024', estado: 'PAGADO', fechaPago: '25 Dic 2024' },
  { id: '2', cliente: 'Comercial XYZ E.I.R.L.', ruc: '20987654321', periodo: 'Diciembre 2024', monto: 450, fechaEmision: '24 Dic 2024', fechaVencimiento: '27 Dic 2024', estado: 'PENDIENTE', fechaPago: null },
  { id: '3', cliente: 'Servicios 123 S.A.', ruc: '20456789123', periodo: 'Diciembre 2024', monto: 1200, fechaEmision: '24 Dic 2024', fechaVencimiento: '27 Dic 2024', estado: 'VENCIDO', fechaPago: null },
  { id: '4', cliente: 'Inversiones DEF S.A.C.', ruc: '20111222333', periodo: 'Noviembre 2024', monto: 650, fechaEmision: '24 Nov 2024', fechaVencimiento: '27 Nov 2024', estado: 'VENCIDO', fechaPago: null },
  { id: '5', cliente: 'Tech Solutions S.A.C.', ruc: '20444555666', periodo: 'Diciembre 2024', monto: 1500, fechaEmision: '24 Dic 2024', fechaVencimiento: '27 Dic 2024', estado: 'PAGADO', fechaPago: '26 Dic 2024' },
];

const estadoConfig = {
  PENDIENTE: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  VENCIDO: { label: 'Vencido', icon: AlertCircle, color: 'bg-red-100 text-red-700 border-red-200' },
  PAGADO: { label: 'Pagado', icon: CheckCircle2, color: 'bg-green-100 text-green-700 border-green-200' },
};

export default function CobranzasPage() {
  const [filtroEstado, setFiltroEstado] = useState('all');
  const [busqueda, setBusqueda] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const cobranzasFiltradas = cobranzas.filter((c) => {
    const matchEstado = filtroEstado === 'all' || c.estado === filtroEstado;
    const matchBusqueda = c.cliente.toLowerCase().includes(busqueda.toLowerCase()) || c.ruc.includes(busqueda);
    return matchEstado && matchBusqueda;
  });

  const totales = {
    pendiente: cobranzas.filter(c => c.estado === 'PENDIENTE').reduce((acc, c) => acc + c.monto, 0),
    vencido: cobranzas.filter(c => c.estado === 'VENCIDO').reduce((acc, c) => acc + c.monto, 0),
    cobrado: cobranzas.filter(c => c.estado === 'PAGADO').reduce((acc, c) => acc + c.monto, 0),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Cobranzas"
        subtitle="Gestión de pagos de clientes"
      />
      
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pendiente</p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-600">S/ {totales.pendiente.toLocaleString()}</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Vencido</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-600">S/ {totales.vencido.toLocaleString()}</p>
                </div>
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Cobrado</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">S/ {totales.cobrado.toLocaleString()}</p>
                </div>
                <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Tasa de Cobro</p>
                  <p className="text-lg sm:text-2xl font-bold">
                    {Math.round((totales.cobrado / (totales.cobrado + totales.pendiente + totales.vencido)) * 100)}%
                  </p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-blue-800">
                <span className="font-medium">Recordatorio:</span> El periodo de cobro es del 24 al 27 de cada mes, correspondiente al mes anterior.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente o RUC..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="VENCIDO">Vencido</SelectItem>
                  <SelectItem value="PAGADO">Pagado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla Desktop */}
        <Card className="hidden md:block">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Cliente</TableHead>
                  <TableHead>RUC</TableHead>
                  <TableHead>Periodo</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cobranzasFiltradas.map((cob) => {
                  const config = estadoConfig[cob.estado as keyof typeof estadoConfig];
                  const Icon = config.icon;
                  return (
                    <TableRow key={cob.id}>
                      <TableCell>
                        <Link href={`/clientes/${cob.id}`} className="font-medium hover:text-primary transition-colors">
                          {cob.cliente}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{cob.ruc}</code>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{cob.periodo}</TableCell>
                      <TableCell className="font-semibold">S/ {cob.monto.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{cob.fechaVencimiento}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={config.color}>
                          <Icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {cob.estado !== 'PAGADO' ? (
                          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm">Registrar Pago</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Registrar Pago</DialogTitle>
                                <DialogDescription>
                                  {cob.cliente} - {cob.periodo}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label>Monto</Label>
                                  <Input value={`S/ ${cob.monto}`} disabled />
                                </div>
                                <div className="grid gap-2">
                                  <Label>Fecha de Pago</Label>
                                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="grid gap-2">
                                  <Label>Observaciones</Label>
                                  <Input placeholder="Opcional" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                                <Button onClick={() => setDialogOpen(false)}>Confirmar Pago</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Pagado: {cob.fechaPago}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Cards Mobile */}
        <div className="md:hidden space-y-3">
          {cobranzasFiltradas.map((cob) => {
            const config = estadoConfig[cob.estado as keyof typeof estadoConfig];
            const Icon = config.icon;
            return (
              <Card key={cob.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link href={`/clientes/${cob.id}`} className="font-medium hover:text-primary transition-colors">
                        {cob.cliente}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{cob.ruc}</p>
                    </div>
                    <Badge variant="outline" className={config.color}>
                      <Icon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Periodo</p>
                      <p>{cob.periodo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Monto</p>
                      <p className="font-semibold">S/ {cob.monto.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Vencimiento</p>
                      <p>{cob.fechaVencimiento}</p>
                    </div>
                    {cob.fechaPago && (
                      <div>
                        <p className="text-xs text-muted-foreground">Pagado</p>
                        <p>{cob.fechaPago}</p>
                      </div>
                    )}
                  </div>
                  {cob.estado !== 'PAGADO' && (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-full">Registrar Pago</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Registrar Pago</DialogTitle>
                          <DialogDescription>
                            {cob.cliente} - {cob.periodo}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label>Monto</Label>
                            <Input value={`S/ ${cob.monto}`} disabled />
                          </div>
                          <div className="grid gap-2">
                            <Label>Fecha de Pago</Label>
                            <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Observaciones</Label>
                            <Input placeholder="Opcional" />
                          </div>
                        </div>
                        <DialogFooter className="flex-col sm:flex-row gap-2">
                          <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">Cancelar</Button>
                          <Button onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">Confirmar Pago</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

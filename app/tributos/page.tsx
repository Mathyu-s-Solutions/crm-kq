'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Search,
  Filter,
  Plus,
  Wallet,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const tributos = [
  {
    id: '1',
    cliente: 'Empresa ABC S.A.C.',
    ruc: '20123456789',
    tipo: 'FRACCIONAMIENTO',
    descripcion: 'Fraccionamiento Art. 36 - Deuda IGV 2023',
    montoTotal: 12000,
    cuotasPagadas: 8,
    cuotasTotales: 24,
    montoCuota: 500,
    proximaCuota: { numero: 9, fecha: '20 Ene 2025' },
    cuotas: [
      { numero: 9, monto: 500, fecha: '20 Ene 2025', estado: 'PENDIENTE' },
      { numero: 10, monto: 500, fecha: '20 Feb 2025', estado: 'PENDIENTE' },
      { numero: 11, monto: 500, fecha: '20 Mar 2025', estado: 'PENDIENTE' },
    ],
  },
  {
    id: '2',
    cliente: 'Comercial XYZ E.I.R.L.',
    ruc: '20987654321',
    tipo: 'MULTA',
    descripcion: 'Multa por declaración tardía - Nov 2024',
    montoTotal: 450,
    cuotasPagadas: 0,
    cuotasTotales: 1,
    montoCuota: 450,
    proximaCuota: { numero: 1, fecha: '15 Ene 2025' },
    cuotas: [
      { numero: 1, monto: 450, fecha: '15 Ene 2025', estado: 'PENDIENTE' },
    ],
  },
  {
    id: '3',
    cliente: 'Servicios 123 S.A.',
    ruc: '20456789123',
    tipo: 'FRACCIONAMIENTO',
    descripcion: 'Fraccionamiento SUNAT - Renta 2022',
    montoTotal: 8500,
    cuotasPagadas: 12,
    cuotasTotales: 18,
    montoCuota: 472,
    proximaCuota: { numero: 13, fecha: '25 Ene 2025' },
    cuotas: [
      { numero: 13, monto: 472, fecha: '25 Ene 2025', estado: 'PENDIENTE' },
      { numero: 14, monto: 472, fecha: '25 Feb 2025', estado: 'PENDIENTE' },
    ],
  },
];

const tipoConfig = {
  FRACCIONAMIENTO: { label: 'Fraccionamiento', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  MULTA: { label: 'Multa', color: 'bg-red-100 text-red-700 border-red-200' },
  IGV: { label: 'IGV', color: 'bg-green-100 text-green-700 border-green-200' },
  RENTA: { label: 'Renta', color: 'bg-purple-100 text-purple-700 border-purple-200' },
};

export default function TributosPage() {
  const [filtroTipo, setFiltroTipo] = useState('all');
  const [busqueda, setBusqueda] = useState('');

  const tributosFiltrados = tributos.filter((t) => {
    const matchTipo = filtroTipo === 'all' || t.tipo === filtroTipo;
    const matchBusqueda = t.cliente.toLowerCase().includes(busqueda.toLowerCase()) || t.ruc.includes(busqueda);
    return matchTipo && matchBusqueda;
  });

  const totalPendiente = tributosFiltrados.reduce((acc, t) => {
    const pendiente = (t.cuotasTotales - t.cuotasPagadas) * t.montoCuota;
    return acc + pendiente;
  }, 0);

  const proximosVencimientos = tributosFiltrados.filter(t => {
    const fecha = new Date(t.proximaCuota.fecha.split(' ').reverse().join('-'));
    const hoy = new Date();
    const diff = (fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Tributos"
        subtitle="Gestión de tributos y fraccionamientos"
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Tributo
          </Button>
        }
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pendiente</p>
                  <p className="text-2xl font-bold text-primary">S/ {totalPendiente.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tributos Activos</p>
                  <p className="text-2xl font-bold text-orange-600">{tributosFiltrados.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Por Vencer (7 días)</p>
                  <p className="text-2xl font-bold text-red-600">{proximosVencimientos}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

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
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="FRACCIONAMIENTO">Fraccionamiento</SelectItem>
                  <SelectItem value="MULTA">Multa</SelectItem>
                  <SelectItem value="IGV">IGV</SelectItem>
                  <SelectItem value="RENTA">Renta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Tributos */}
        <div className="space-y-4">
          {tributosFiltrados.map((tributo) => {
            const config = tipoConfig[tributo.tipo as keyof typeof tipoConfig];
            const progreso = (tributo.cuotasPagadas / tributo.cuotasTotales) * 100;
            const pendiente = (tributo.cuotasTotales - tributo.cuotasPagadas) * tributo.montoCuota;

            return (
              <Card key={tributo.id}>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" className="border-0">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Link href={`/clientes/${tributo.id}`} className="font-semibold hover:text-primary transition-colors">
                              {tributo.cliente}
                            </Link>
                            <Badge variant="outline" className={config.color}>
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{tributo.descripcion}</p>
                          <code className="text-xs bg-muted px-2 py-1 rounded">RUC: {tributo.ruc}</code>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-lg font-bold">S/ {tributo.montoTotal.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Monto Total</p>
                          </div>

                          <div className="text-center min-w-[100px]">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span className="text-lg font-bold">{tributo.cuotasPagadas}</span>
                              <span className="text-muted-foreground">/</span>
                              <span className="text-lg font-bold">{tributo.cuotasTotales}</span>
                            </div>
                            <Progress value={progreso} className="h-2 w-20" />
                            <p className="text-xs text-muted-foreground mt-1">Cuotas</p>
                          </div>

                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground">Próxima cuota</p>
                            <p className="font-bold">S/ {tributo.montoCuota}</p>
                            <p className="text-xs text-muted-foreground">{tributo.proximaCuota.fecha}</p>
                          </div>

                          <AccordionTrigger className="p-0 hover:no-underline">
                            <Button variant="outline" size="sm" className="gap-1">
                              Cronograma
                              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                            </Button>
                          </AccordionTrigger>
                        </div>
                      </div>
                    </div>

                    <AccordionContent>
                      <div className="px-6 pb-6">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-muted/50 px-4 py-2 border-b">
                            <p className="text-sm font-medium">Próximas Cuotas</p>
                          </div>
                          <div className="divide-y">
                            {tributo.cuotas.map((cuota) => (
                              <div key={cuota.numero} className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    {cuota.numero}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Cuota {cuota.numero}</p>
                                    <p className="text-xs text-muted-foreground">{cuota.fecha}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-semibold">S/ {cuota.monto}</span>
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Pendiente
                                  </Badge>
                                  <Button size="sm" variant="outline">Registrar Pago</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Saldo pendiente</p>
                            <p className="text-xl font-bold">S/ {pendiente.toLocaleString()}</p>
                          </div>
                          <Button>Ver cronograma completo</Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

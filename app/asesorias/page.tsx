'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  User,
  Video,
  Phone,
} from 'lucide-react';

const clientes = [
  {
    id: '1',
    nombre: 'Empresa ABC S.A.C.',
    ruc: '20123456789',
    plan: 'ESTANDAR',
    asesoriasUsadas: 2,
    asesoriasDisponibles: 4,
    proximaAsesoria: { fecha: '10 Ene 2025', hora: '10:00', tema: 'Revisión tributaria mensual' },
  },
  {
    id: '2',
    nombre: 'Servicios 123 S.A.',
    ruc: '20456789123',
    plan: 'PREMIUM',
    asesoriasUsadas: 5,
    asesoriasDisponibles: 8,
    proximaAsesoria: null,
  },
  {
    id: '3',
    nombre: 'Comercial XYZ E.I.R.L.',
    ruc: '20987654321',
    plan: 'BASICO',
    asesoriasUsadas: 2,
    asesoriasDisponibles: 2,
    proximaAsesoria: null,
  },
  {
    id: '4',
    nombre: 'Tech Solutions S.A.C.',
    ruc: '20444555666',
    plan: 'PREMIUM',
    asesoriasUsadas: 3,
    asesoriasDisponibles: 8,
    proximaAsesoria: { fecha: '15 Ene 2025', hora: '15:00', tema: 'Planificación fiscal 2025' },
  },
];

const historial = [
  { fecha: '05 Ene 2025', cliente: 'Empresa ABC S.A.C.', tema: 'Declaración anual de renta', duracion: 45, responsable: 'Ana Torres', tipo: 'video' },
  { fecha: '03 Ene 2025', cliente: 'Servicios 123 S.A.', tema: 'Fraccionamiento SUNAT', duracion: 60, responsable: 'Carlos Ruiz', tipo: 'presencial' },
  { fecha: '28 Dic 2024', cliente: 'Comercial XYZ E.I.R.L.', tema: 'Cambio de régimen tributario', duracion: 30, responsable: 'Ana Torres', tipo: 'telefono' },
  { fecha: '20 Dic 2024', cliente: 'Tech Solutions S.A.C.', tema: 'Revisión de libros contables', duracion: 90, responsable: 'Carlos Ruiz', tipo: 'video' },
];

const planConfig = {
  BASICO: { label: 'Básico', color: 'bg-slate-100 text-slate-700', asesorias: 2 },
  ESTANDAR: { label: 'Estándar', color: 'bg-blue-100 text-blue-700', asesorias: 4 },
  PREMIUM: { label: 'Premium', color: 'bg-purple-100 text-purple-700', asesorias: 8 },
  ENTERPRISE: { label: 'Enterprise', color: 'bg-amber-100 text-amber-700', asesorias: 'Ilimitadas' },
};

const tipoIcono = {
  video: Video,
  presencial: User,
  telefono: Phone,
};

export default function AsesoriasPage() {
  const [busqueda, setBusqueda] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.ruc.includes(busqueda)
  );

  const totalProgramadas = clientes.filter(c => c.proximaAsesoria).length;
  const totalRealizadas = historial.length;
  const clientesSinDisponibilidad = clientes.filter(c => c.asesoriasUsadas >= c.asesoriasDisponibles).length;

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Asesorías"
        subtitle="Gestión de sesiones de asesoría"
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Agendar Asesoría
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agendar Nueva Asesoría</DialogTitle>
                <DialogDescription>
                  Programa una sesión de asesoría con un cliente
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.filter(c => c.asesoriasUsadas < c.asesoriasDisponibles).map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Fecha</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Hora</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Tipo de Asesoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Videollamada</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="telefono">Telefónica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Tema / Descripción</Label>
                  <Textarea placeholder="Describe el tema de la asesoría..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => setDialogOpen(false)}>Agendar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Programadas</p>
                  <p className="text-2xl font-bold text-primary">{totalProgramadas}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Realizadas (mes)</p>
                  <p className="text-2xl font-bold text-green-600">{totalRealizadas}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sin Disponibilidad</p>
                  <p className="text-2xl font-bold text-orange-600">{clientesSinDisponibilidad}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Horas Totales</p>
                  <p className="text-2xl font-bold text-blue-600">12.5h</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Clientes */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cliente..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardContent>
            </Card>

            {clientesFiltrados.map((cliente) => {
              const config = planConfig[cliente.plan as keyof typeof planConfig];
              const progreso = (cliente.asesoriasUsadas / cliente.asesoriasDisponibles) * 100;
              const sinDisponibilidad = cliente.asesoriasUsadas >= cliente.asesoriasDisponibles;

              return (
                <Card key={cliente.id} className={sinDisponibilidad ? 'border-orange-200 bg-orange-50/30' : ''}>
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {getInitials(cliente.nombre)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Link href={`/clientes/${cliente.id}`} className="font-semibold hover:text-primary transition-colors">
                            {cliente.nombre}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-muted px-2 py-0.5 rounded">{cliente.ruc}</code>
                            <Badge variant="secondary" className={config.color}>
                              {config.label}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center min-w-[120px]">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <span className="text-xl font-bold">{cliente.asesoriasUsadas}</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-xl font-bold">{cliente.asesoriasDisponibles}</span>
                          </div>
                          <Progress 
                            value={progreso} 
                            className={`h-2 ${sinDisponibilidad ? '[&>div]:bg-orange-500' : ''}`}
                          />
                          <p className="text-xs text-muted-foreground mt-1">Asesorías usadas</p>
                        </div>

                        {cliente.proximaAsesoria ? (
                          <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20 min-w-[140px]">
                            <p className="text-xs text-muted-foreground">Próxima</p>
                            <p className="font-semibold text-sm">{cliente.proximaAsesoria.fecha}</p>
                            <p className="text-xs text-primary">{cliente.proximaAsesoria.hora}</p>
                          </div>
                        ) : (
                          <div className="text-center p-3 bg-muted/50 rounded-lg min-w-[140px]">
                            <p className="text-xs text-muted-foreground">Sin asesorías</p>
                            <p className="text-sm">programadas</p>
                          </div>
                        )}

                        <Button 
                          variant={sinDisponibilidad ? 'outline' : 'default'}
                          size="sm"
                          disabled={sinDisponibilidad}
                        >
                          {sinDisponibilidad ? 'Sin cupo' : 'Agendar'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Historial */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Historial Reciente
              </CardTitle>
              <CardDescription>Últimas asesorías realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {historial.map((item, idx) => {
                    const Icon = tipoIcono[item.tipo as keyof typeof tipoIcono];
                    return (
                      <div key={idx} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.cliente}</p>
                              <p className="text-xs text-muted-foreground">{item.fecha}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.duracion} min
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.tema}</p>
                        <p className="text-xs text-muted-foreground">
                          Atendido por: {item.responsable}
                        </p>
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

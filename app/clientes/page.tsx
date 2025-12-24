'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Filter, MoreHorizontal, Eye, Pencil, Phone, Mail, Building2, UserPlus } from 'lucide-react';
import type { Cliente, RegimenTributario, PlanServicio } from '@/types';

const clientesEjemplo: Cliente[] = [
  { id: '1', ruc: '20123456789', razonSocial: 'Empresa ABC S.A.C.', titulares: ['Juan Pérez'], email: 'contacto@empresaabc.com', telefono: '999888777', regimenTributario: 'MYPE', regimenLaboral: 'PEQUEÑA', planServicio: 'ESTANDAR', fechaCreacion: new Date(), activo: true },
  { id: '2', ruc: '20987654321', razonSocial: 'Comercial XYZ E.I.R.L.', titulares: ['María García'], email: 'info@comercialxyz.pe', telefono: '998877665', regimenTributario: 'RUS', regimenLaboral: 'MICRO', planServicio: 'BASICO', fechaCreacion: new Date(), activo: true },
];

const regimenConfig: Record<RegimenTributario, { label: string; color: string }> = {
  RUS: { label: 'RUS', color: 'bg-emerald-100 text-emerald-700' },
  RER: { label: 'RER', color: 'bg-blue-100 text-blue-700' },
  MYPE: { label: 'MYPE', color: 'bg-violet-100 text-violet-700' },
  GENERAL: { label: 'General', color: 'bg-amber-100 text-amber-700' },
};

const planConfig: Record<PlanServicio, { label: string; color: string }> = {
  BASICO: { label: 'Básico', color: 'bg-slate-100 text-slate-700' },
  ESTANDAR: { label: 'Estándar', color: 'bg-blue-100 text-blue-700' },
  PREMIUM: { label: 'Premium', color: 'bg-purple-100 text-purple-700' },
  ENTERPRISE: { label: 'Enterprise', color: 'bg-amber-100 text-amber-700' },
};

export default function ClientesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroRegimen, setFiltroRegimen] = useState<string>('all');

  const clientesFiltrados = clientesEjemplo.filter((c) => {
    const matchBusqueda = c.razonSocial.toLowerCase().includes(busqueda.toLowerCase());
    const matchRegimen = filtroRegimen === 'all' || c.regimenTributario === filtroRegimen;
    return matchBusqueda && matchRegimen;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Clientes" subtitle={`${clientesFiltrados.length} clientes`} 
        actions={<Button asChild><Link href="/clientes/nuevo"><UserPlus className="h-4 w-4 mr-2" />Nuevo</Link></Button>} />
      <div className="flex-1 p-6 space-y-4">
        <Card>
          <CardContent className="p-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="pl-9" />
            </div>
            <Select value={filtroRegimen} onValueChange={setFiltroRegimen}>
              <SelectTrigger className="w-[160px]"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="RUS">RUS</SelectItem>
                <SelectItem value="MYPE">MYPE</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Cliente</TableHead>
                  <TableHead>RUC</TableHead>
                  <TableHead>Régimen</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesFiltrados.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {c.razonSocial.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Link href={`/clientes/${c.id}`} className="font-medium hover:text-primary">
                            {c.razonSocial}
                          </Link>
                          <p className="text-xs text-muted-foreground">{c.titulares.join(', ')}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><code className="text-sm bg-muted px-2 py-1 rounded">{c.ruc}</code></TableCell>
                    <TableCell>
                      <Badge variant="outline" className={regimenConfig[c.regimenTributario].color}>
                        {regimenConfig[c.regimenTributario].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={planConfig[c.planServicio].color}>
                        {planConfig[c.planServicio].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <a href={`tel:${c.telefono}`}><Phone className="h-4 w-4" /></a>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <a href={`mailto:${c.email}`}><Mail className="h-4 w-4" /></a>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/clientes/${c.id}`}><Eye className="h-4 w-4 mr-2" />Ver</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/clientes/${c.id}/editar`}><Pencil className="h-4 w-4 mr-2" />Editar</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {clientesFiltrados.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No se encontraron clientes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

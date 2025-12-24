'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Input, Badge } from '@/components/ui';
import type { Cliente, RegimenTributario, PlanServicio } from '@/types';

// Datos de ejemplo
const clientesEjemplo: Cliente[] = [
  {
    id: '1',
    ruc: '20123456789',
    razonSocial: 'Empresa ABC S.A.C.',
    titulares: ['Juan Pérez'],
    email: 'contacto@empresaabc.com',
    telefono: '999888777',
    regimenTributario: 'MYPE',
    regimenLaboral: 'PEQUEÑA',
    planServicio: 'ESTANDAR',
    fechaCreacion: new Date('2024-01-15'),
    activo: true,
  },
  {
    id: '2',
    ruc: '20987654321',
    razonSocial: 'Comercial XYZ E.I.R.L.',
    titulares: ['María García'],
    email: 'info@comercialxyz.pe',
    telefono: '998877665',
    regimenTributario: 'RUS',
    regimenLaboral: 'MICRO',
    planServicio: 'BASICO',
    fechaCreacion: new Date('2024-03-20'),
    activo: true,
  },
  {
    id: '3',
    ruc: '20456789123',
    razonSocial: 'Servicios 123 S.A.',
    titulares: ['Carlos López', 'Ana Torres'],
    email: 'admin@servicios123.com',
    telefono: '997766554',
    regimenTributario: 'GENERAL',
    regimenLaboral: 'GENERAL',
    planServicio: 'PREMIUM',
    fechaCreacion: new Date('2023-11-10'),
    activo: true,
  },
];

const regimenColors: Record<RegimenTributario, string> = {
  RUS: 'bg-green-100 text-green-800',
  RER: 'bg-blue-100 text-blue-800',
  MYPE: 'bg-purple-100 text-purple-800',
  GENERAL: 'bg-orange-100 text-orange-800',
};

const planColors: Record<PlanServicio, string> = {
  BASICO: 'bg-gray-100 text-gray-800',
  ESTANDAR: 'bg-blue-100 text-blue-800',
  PREMIUM: 'bg-purple-100 text-purple-800',
  ENTERPRISE: 'bg-yellow-100 text-yellow-800',
};

export default function ClientesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroRegimen, setFiltroRegimen] = useState<string>('');

  const clientesFiltrados = clientesEjemplo.filter((cliente) => {
    const matchBusqueda = 
      cliente.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.ruc.includes(busqueda);
    const matchRegimen = !filtroRegimen || cliente.regimenTributario === filtroRegimen;
    return matchBusqueda && matchRegimen;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Clientes</h1>
        <Link href="/clientes/nuevo">
          <Button>+ Nuevo Cliente</Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Buscar por RUC o razón social..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border border-border rounded-lg bg-bg-white"
            value={filtroRegimen}
            onChange={(e) => setFiltroRegimen(e.target.value)}
          >
            <option value="">Todos los regímenes</option>
            <option value="RUS">RUS</option>
            <option value="RER">RER</option>
            <option value="MYPE">MYPE</option>
            <option value="GENERAL">General</option>
          </select>
        </div>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">RUC</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Razón Social</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Régimen</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Plan</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Contacto</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="border-b border-border last:border-0 hover:bg-bg">
                  <td className="py-3 px-4 text-sm font-mono">{cliente.ruc}</td>
                  <td className="py-3 px-4">
                    <Link href={`/clientes/${cliente.id}`} className="text-primary hover:underline font-medium">
                      {cliente.razonSocial}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${regimenColors[cliente.regimenTributario]}`}>
                      {cliente.regimenTributario}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${planColors[cliente.planServicio]}`}>
                      {cliente.planServicio}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-muted">{cliente.telefono}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link href={`/clientes/${cliente.id}`}>
                        <Button variant="outline" size="sm">Ver</Button>
                      </Link>
                      <Link href={`/clientes/${cliente.id}/editar`}>
                        <Button variant="secondary" size="sm">Editar</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {clientesFiltrados.length === 0 && (
          <div className="text-center py-8 text-text-muted">
            No se encontraron clientes con los filtros aplicados.
          </div>
        )}
      </Card>
    </div>
  );
}

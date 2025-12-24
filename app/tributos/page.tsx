'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Input, Select } from '@/components/ui';

const tributos = [
  {
    id: '1',
    cliente: 'Empresa ABC S.A.C.',
    ruc: '20123456789',
    tipo: 'FRACCIONAMIENTO',
    descripcion: 'Fraccionamiento Art. 36',
    montoTotal: 12000,
    cuotasPagadas: 8,
    cuotasTotales: 24,
    proximaCuota: { numero: 9, monto: 500, fecha: '2025-01-20' },
  },
  {
    id: '2',
    cliente: 'Comercial XYZ E.I.R.L.',
    ruc: '20987654321',
    tipo: 'MULTA',
    descripcion: 'Multa por declaración tardía',
    montoTotal: 450,
    cuotasPagadas: 0,
    cuotasTotales: 1,
    proximaCuota: { numero: 1, monto: 450, fecha: '2025-01-15' },
  },
  {
    id: '3',
    cliente: 'Servicios 123 S.A.',
    ruc: '20456789123',
    tipo: 'IGV',
    descripcion: 'IGV Enero 2025',
    montoTotal: 3500,
    cuotasPagadas: 0,
    cuotasTotales: 1,
    proximaCuota: { numero: 1, monto: 3500, fecha: '2025-02-17' },
  },
];

const tiposTributo = [
  { value: '', label: 'Todos' },
  { value: 'IGV', label: 'IGV' },
  { value: 'FRACCIONAMIENTO', label: 'Fraccionamiento' },
  { value: 'MULTA', label: 'Multa' },
  { value: 'RENTA', label: 'Renta' },
];

export default function TributosPage() {
  const [filtroTipo, setFiltroTipo] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const tributosFiltrados = tributos.filter((t) => {
    const matchTipo = !filtroTipo || t.tipo === filtroTipo;
    const matchBusqueda = t.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.ruc.includes(busqueda);
    return matchTipo && matchBusqueda;
  });

  const totalPendiente = tributosFiltrados.reduce((acc, t) => {
    const pendiente = t.montoTotal - (t.cuotasPagadas * (t.montoTotal / t.cuotasTotales));
    return acc + pendiente;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Tributos Pendientes</h1>
        <Button>+ Nuevo Tributo</Button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <div className="flex items-center gap-4">
            <span className="text-3xl">💰</span>
            <div>
              <p className="text-2xl font-bold text-primary">S/ {totalPendiente.toLocaleString()}</p>
              <p className="text-sm text-text-muted">Total Pendiente</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-2xl font-bold text-orange-600">{tributosFiltrados.length}</p>
              <p className="text-sm text-text-muted">Tributos Activos</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-text-muted">Por Vencer (7 días)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Buscar por cliente o RUC..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Select
              options={tiposTributo}
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Lista de Tributos */}
      <div className="space-y-4">
        {tributosFiltrados.map((tributo) => (
          <Card key={tributo.id}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Link href={`/clientes/${tributo.id}`} className="font-medium text-primary hover:underline">
                    {tributo.cliente}
                  </Link>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    tributo.tipo === 'FRACCIONAMIENTO' ? 'bg-blue-100 text-blue-800' :
                    tributo.tipo === 'MULTA' ? 'bg-red-100 text-red-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {tributo.tipo}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{tributo.descripcion}</p>
                <p className="text-xs text-text-muted font-mono">RUC: {tributo.ruc}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold">S/ {tributo.montoTotal.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">Monto Total</p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold">{tributo.cuotasPagadas}/{tributo.cuotasTotales}</p>
                  <p className="text-xs text-text-muted">Cuotas</p>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(tributo.cuotasPagadas / tributo.cuotasTotales) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="text-center p-3 bg-bg rounded-lg">
                  <p className="text-xs text-text-muted">Próxima cuota</p>
                  <p className="font-bold">S/ {tributo.proximaCuota.monto}</p>
                  <p className="text-xs text-text-muted">{tributo.proximaCuota.fecha}</p>
                </div>

                <Button variant="outline" size="sm">Ver cronograma</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Input, Select } from '@/components/ui';

const cobranzas = [
  {
    id: '1',
    cliente: 'Empresa ABC S.A.C.',
    ruc: '20123456789',
    periodo: 'Noviembre 2024',
    monto: 850,
    fechaEmision: '2024-12-24',
    fechaVencimiento: '2024-12-27',
    estado: 'PAGADO',
    fechaPago: '2024-12-25',
  },
  {
    id: '2',
    cliente: 'Comercial XYZ E.I.R.L.',
    ruc: '20987654321',
    periodo: 'Noviembre 2024',
    monto: 450,
    fechaEmision: '2024-12-24',
    fechaVencimiento: '2024-12-27',
    estado: 'PENDIENTE',
    fechaPago: null,
  },
  {
    id: '3',
    cliente: 'Servicios 123 S.A.',
    ruc: '20456789123',
    periodo: 'Noviembre 2024',
    monto: 1200,
    fechaEmision: '2024-12-24',
    fechaVencimiento: '2024-12-27',
    estado: 'VENCIDO',
    fechaPago: null,
  },
  {
    id: '4',
    cliente: 'Inversiones DEF S.A.C.',
    ruc: '20111222333',
    periodo: 'Octubre 2024',
    monto: 650,
    fechaEmision: '2024-11-24',
    fechaVencimiento: '2024-11-27',
    estado: 'VENCIDO',
    fechaPago: null,
  },
];

const estadosCobranza = [
  { value: '', label: 'Todos' },
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'PAGADO', label: 'Pagado' },
  { value: 'VENCIDO', label: 'Vencido' },
];

export default function CobranzasPage() {
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const cobranzasFiltradas = cobranzas.filter((c) => {
    const matchEstado = !filtroEstado || c.estado === filtroEstado;
    const matchBusqueda = c.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.ruc.includes(busqueda);
    return matchEstado && matchBusqueda;
  });

  const totales = {
    pendiente: cobranzas.filter(c => c.estado === 'PENDIENTE').reduce((acc, c) => acc + c.monto, 0),
    vencido: cobranzas.filter(c => c.estado === 'VENCIDO').reduce((acc, c) => acc + c.monto, 0),
    cobrado: cobranzas.filter(c => c.estado === 'PAGADO').reduce((acc, c) => acc + c.monto, 0),
  };

  const marcarPagado = (id: string) => {
    console.log(`Marcar como pagado: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Cobranzas</h1>
        <div className="text-sm text-text-muted">
          Periodo de cobro: 24 al 27 de cada mes
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">⏳</span>
            <div>
              <p className="text-2xl font-bold text-yellow-600">S/ {totales.pendiente.toLocaleString()}</p>
              <p className="text-sm text-text-muted">Pendiente de Cobro</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔴</span>
            <div>
              <p className="text-2xl font-bold text-red-600">S/ {totales.vencido.toLocaleString()}</p>
              <p className="text-sm text-text-muted">Vencido</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="text-2xl font-bold text-green-600">S/ {totales.cobrado.toLocaleString()}</p>
              <p className="text-sm text-text-muted">Cobrado este mes</p>
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
              options={estadosCobranza}
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Lista de Cobranzas */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">RUC</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Periodo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Monto</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Vencimiento</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cobranzasFiltradas.map((cobranza) => (
                <tr key={cobranza.id} className="border-b border-border last:border-0 hover:bg-bg">
                  <td className="py-3 px-4">
                    <Link href={`/clientes/${cobranza.id}`} className="text-primary hover:underline font-medium">
                      {cobranza.cliente}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">{cobranza.ruc}</td>
                  <td className="py-3 px-4 text-sm">{cobranza.periodo}</td>
                  <td className="py-3 px-4 font-medium">S/ {cobranza.monto.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm">{cobranza.fechaVencimiento}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      cobranza.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                      cobranza.estado === 'VENCIDO' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {cobranza.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {cobranza.estado !== 'PAGADO' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => marcarPagado(cobranza.id)}
                      >
                        Registrar Pago
                      </Button>
                    ) : (
                      <span className="text-xs text-text-muted">
                        Pagado: {cobranza.fechaPago}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Nota informativa */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <span className="text-blue-500">ℹ️</span>
          <div>
            <p className="font-medium text-blue-800">Recordatorio de Cobranza</p>
            <p className="text-sm text-blue-700">
              El cobro se realiza del 24 al 27 de cada mes, correspondiente al periodo del mes anterior.
              Ejemplo: Del 24 al 27 de diciembre se cobra la declaración de noviembre.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

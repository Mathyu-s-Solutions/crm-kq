'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Select } from '@/components/ui';

const declaraciones = [
  { id: '1', cliente: 'Empresa ABC S.A.C.', ruc: '20123456789', tipo: 'PDT 621', periodo: '2025-01', estado: 'PENDIENTE' },
  { id: '2', cliente: 'Empresa ABC S.A.C.', ruc: '20123456789', tipo: 'PLAME', periodo: '2025-01', estado: 'EN_PROCESO' },
  { id: '3', cliente: 'Comercial XYZ E.I.R.L.', ruc: '20987654321', tipo: 'NRUS', periodo: '2025-01', estado: 'PENDIENTE' },
  { id: '4', cliente: 'Servicios 123 S.A.', ruc: '20456789123', tipo: 'PDT 621', periodo: '2025-01', estado: 'PRESENTADO' },
  { id: '5', cliente: 'Servicios 123 S.A.', ruc: '20456789123', tipo: 'PLAME', periodo: '2025-01', estado: 'PRESENTADO' },
  { id: '6', cliente: 'Inversiones DEF S.A.C.', ruc: '20111222333', tipo: 'PDT 621', periodo: '2025-01', estado: 'PENDIENTE' },
];

const periodos = [
  { value: '2025-01', label: 'Enero 2025' },
  { value: '2024-12', label: 'Diciembre 2024' },
  { value: '2024-11', label: 'Noviembre 2024' },
];

const tipos = [
  { value: '', label: 'Todos' },
  { value: 'PDT 621', label: 'PDT 621' },
  { value: 'PLAME', label: 'PLAME' },
  { value: 'NRUS', label: 'NRUS' },
  { value: 'RENTA_4TA', label: 'Renta 4ta' },
];

const estados = [
  { value: '', label: 'Todos' },
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'EN_PROCESO', label: 'En Proceso' },
  { value: 'PRESENTADO', label: 'Presentado' },
];

export default function DeclaracionesPage() {
  const [filtros, setFiltros] = useState({
    periodo: '2025-01',
    tipo: '',
    estado: '',
  });

  const declaracionesFiltradas = declaraciones.filter((d) => {
    const matchPeriodo = d.periodo === filtros.periodo;
    const matchTipo = !filtros.tipo || d.tipo === filtros.tipo;
    const matchEstado = !filtros.estado || d.estado === filtros.estado;
    return matchPeriodo && matchTipo && matchEstado;
  });

  const contadores = {
    pendientes: declaracionesFiltradas.filter(d => d.estado === 'PENDIENTE').length,
    enProceso: declaracionesFiltradas.filter(d => d.estado === 'EN_PROCESO').length,
    presentados: declaracionesFiltradas.filter(d => d.estado === 'PRESENTADO').length,
  };

  const cambiarEstado = (id: string, nuevoEstado: string) => {
    console.log(`Cambiar estado de ${id} a ${nuevoEstado}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Declaraciones Mensuales</h1>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">⏳</span>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{contadores.pendientes}</p>
              <p className="text-sm text-text-muted">Pendientes</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔄</span>
            <div>
              <p className="text-2xl font-bold text-blue-600">{contadores.enProceso}</p>
              <p className="text-sm text-text-muted">En Proceso</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="text-2xl font-bold text-green-600">{contadores.presentados}</p>
              <p className="text-sm text-text-muted">Presentados</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <Select
              label="Periodo"
              options={periodos}
              value={filtros.periodo}
              onChange={(e) => setFiltros({ ...filtros, periodo: e.target.value })}
            />
          </div>
          <div className="w-48">
            <Select
              label="Tipo"
              options={tipos}
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
            />
          </div>
          <div className="w-48">
            <Select
              label="Estado"
              options={estados}
              value={filtros.estado}
              onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Lista de Declaraciones */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">RUC</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Tipo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Periodo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {declaracionesFiltradas.map((dec) => (
                <tr key={dec.id} className="border-b border-border last:border-0 hover:bg-bg">
                  <td className="py-3 px-4">
                    <Link href={`/clientes/${dec.id}`} className="text-primary hover:underline">
                      {dec.cliente}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">{dec.ruc}</td>
                  <td className="py-3 px-4 text-sm">{dec.tipo}</td>
                  <td className="py-3 px-4 text-sm">{dec.periodo}</td>
                  <td className="py-3 px-4">
                    <select
                      value={dec.estado}
                      onChange={(e) => cambiarEstado(dec.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${
                        dec.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                        dec.estado === 'EN_PROCESO' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="EN_PROCESO">En Proceso</option>
                      <option value="PRESENTADO">Presentado</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Ver detalle</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

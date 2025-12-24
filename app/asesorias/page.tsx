'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Input, Select } from '@/components/ui';

const asesorias = [
  {
    id: '1',
    cliente: 'Empresa ABC S.A.C.',
    ruc: '20123456789',
    plan: 'ESTANDAR',
    asesoriasUsadas: 2,
    asesoriasDisponibles: 4,
    proximaAsesoria: { fecha: '2025-01-10', hora: '10:00', tema: 'Revisión tributaria' },
  },
  {
    id: '2',
    cliente: 'Servicios 123 S.A.',
    ruc: '20456789123',
    plan: 'PREMIUM',
    asesoriasUsadas: 5,
    asesoriasDisponibles: 8,
    proximaAsesoria: null,
  },
  {
    id: '3',
    cliente: 'Comercial XYZ E.I.R.L.',
    ruc: '20987654321',
    plan: 'BASICO',
    asesoriasUsadas: 1,
    asesoriasDisponibles: 2,
    proximaAsesoria: { fecha: '2025-01-15', hora: '15:00', tema: 'Consulta PLAME' },
  },
];

const historialAsesorias = [
  { fecha: '2025-01-05', cliente: 'Empresa ABC S.A.C.', tema: 'Declaración anual', duracion: 45, responsable: 'Ana Torres' },
  { fecha: '2025-01-03', cliente: 'Servicios 123 S.A.', tema: 'Fraccionamiento SUNAT', duracion: 60, responsable: 'Carlos Ruiz' },
  { fecha: '2024-12-28', cliente: 'Comercial XYZ E.I.R.L.', tema: 'Régimen tributario', duracion: 30, responsable: 'Ana Torres' },
];

export default function AsesoriasPage() {
  const [busqueda, setBusqueda] = useState('');

  const clientesFiltrados = asesorias.filter((a) =>
    a.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.ruc.includes(busqueda)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Asesorías</h1>
        <Link href="/asesorias/nueva">
          <Button>+ Agendar Asesoría</Button>
        </Link>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <div className="flex items-center gap-4">
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-text-muted">Asesorías Programadas</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-text-muted">Realizadas este mes</p>
            </div>
          </div>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <div className="flex items-center gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <p className="text-2xl font-bold text-orange-600">2</p>
              <p className="text-sm text-text-muted">Clientes sin disponibilidad</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control de Asesorías por Cliente */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="mb-4">
              <Input
                placeholder="Buscar cliente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </Card>

          {clientesFiltrados.map((cliente) => (
            <Card key={cliente.id}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Link href={`/clientes/${cliente.id}`} className="font-medium text-primary hover:underline">
                    {cliente.cliente}
                  </Link>
                  <p className="text-xs text-text-muted font-mono">RUC: {cliente.ruc}</p>
                  <span className={`inline-flex mt-1 px-2 py-0.5 text-xs rounded-full ${
                    cliente.plan === 'PREMIUM' ? 'bg-purple-100 text-purple-800' :
                    cliente.plan === 'ESTANDAR' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    Plan {cliente.plan}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold">{cliente.asesoriasUsadas}/{cliente.asesoriasDisponibles}</p>
                    <p className="text-xs text-text-muted">Asesorías usadas</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className={`h-full rounded-full ${
                          cliente.asesoriasUsadas >= cliente.asesoriasDisponibles ? 'bg-red-500' :
                          cliente.asesoriasUsadas >= cliente.asesoriasDisponibles * 0.75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(cliente.asesoriasUsadas / cliente.asesoriasDisponibles) * 100}%` }}
                      />
                    </div>
                  </div>

                  {cliente.proximaAsesoria ? (
                    <div className="text-center p-3 bg-bg rounded-lg">
                      <p className="text-xs text-text-muted">Próxima asesoría</p>
                      <p className="font-medium text-sm">{cliente.proximaAsesoria.fecha}</p>
                      <p className="text-xs text-text-muted">{cliente.proximaAsesoria.hora}</p>
                    </div>
                  ) : (
                    <div className="text-center p-3 bg-bg rounded-lg">
                      <p className="text-xs text-text-muted">Sin asesorías</p>
                      <p className="text-sm">programadas</p>
                    </div>
                  )}

                  <Button variant="outline" size="sm">Agendar</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Historial Reciente */}
        <Card title="Historial Reciente">
          <div className="space-y-4">
            {historialAsesorias.map((asesoria, idx) => (
              <div key={idx} className="p-3 bg-bg rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{asesoria.cliente}</span>
                  <span className="text-xs text-text-muted">{asesoria.fecha}</span>
                </div>
                <p className="text-sm text-text-muted">{asesoria.tema}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
                  <span>{asesoria.duracion} min</span>
                  <span>{asesoria.responsable}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card, Button, Badge } from '@/components/ui';

// Datos de ejemplo
const clienteEjemplo = {
  id: '1',
  ruc: '20123456789',
  razonSocial: 'Empresa ABC S.A.C.',
  titulares: ['Juan Pérez', 'María López'],
  email: 'contacto@empresaabc.com',
  telefono: '999888777',
  regimenTributario: 'MYPE',
  regimenLaboral: 'PEQUEÑA',
  otrosRegistros: 'Registro REMYPE vigente',
  planServicio: 'ESTANDAR',
  fechaCreacion: new Date('2024-01-15'),
  activo: true,
};

const interacciones = [
  { fecha: '2025-01-10', tipo: 'CONSULTA', descripcion: 'Consulta sobre declaración mensual', responsable: 'Ana Torres', rol: 'CONTADOR' },
  { fecha: '2025-01-05', tipo: 'GESTION', descripcion: 'Presentación PDT 621 diciembre', responsable: 'Carlos Ruiz', rol: 'ASISTENTE' },
  { fecha: '2024-12-20', tipo: 'COMENTARIO', descripcion: 'Cliente solicita asesoría tributaria', responsable: 'Ana Torres', rol: 'CONTADOR' },
];

const declaraciones = [
  { periodo: '2025-01', tipo: 'PDT 621', estado: 'PENDIENTE' },
  { periodo: '2025-01', tipo: 'PLAME', estado: 'PENDIENTE' },
  { periodo: '2024-12', tipo: 'PDT 621', estado: 'PRESENTADO' },
  { periodo: '2024-12', tipo: 'PLAME', estado: 'PRESENTADO' },
];

export default function ClienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/clientes" className="text-text-muted hover:text-text">
            ← Volver
          </Link>
          <h1 className="text-2xl font-bold text-text">{clienteEjemplo.razonSocial}</h1>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Activo</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/clientes/${id}/editar`}>
            <Button variant="outline">Editar</Button>
          </Link>
          <Button>+ Nueva Interacción</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información General */}
        <Card title="Información General" className="lg:col-span-1">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted">RUC</p>
              <p className="font-mono font-medium">{clienteEjemplo.ruc}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Titulares</p>
              <p>{clienteEjemplo.titulares.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Email</p>
              <p>{clienteEjemplo.email}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Teléfono</p>
              <p>{clienteEjemplo.telefono}</p>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-text-muted">Régimen Tributario</p>
              <span className="inline-flex px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 mt-1">
                {clienteEjemplo.regimenTributario}
              </span>
            </div>
            <div>
              <p className="text-sm text-text-muted">Régimen Laboral</p>
              <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mt-1">
                {clienteEjemplo.regimenLaboral}
              </span>
            </div>
            <div>
              <p className="text-sm text-text-muted">Plan de Servicio</p>
              <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mt-1">
                {clienteEjemplo.planServicio}
              </span>
            </div>
            {clienteEjemplo.otrosRegistros && (
              <div>
                <p className="text-sm text-text-muted">Otros Registros</p>
                <p className="text-sm">{clienteEjemplo.otrosRegistros}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Historial de Interacciones */}
        <Card title="Historial de Interacciones" className="lg:col-span-2">
          <div className="space-y-4">
            {interacciones.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-bg rounded-lg">
                <div className="flex-shrink-0">
                  <span className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-sm ${
                    item.tipo === 'CONSULTA' ? 'bg-blue-100 text-blue-600' :
                    item.tipo === 'GESTION' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.tipo === 'CONSULTA' ? '❓' : item.tipo === 'GESTION' ? '✅' : '💬'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{item.tipo}</span>
                    <span className="text-xs text-text-muted">{item.fecha}</span>
                  </div>
                  <p className="text-sm text-text-muted">{item.descripcion}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {item.responsable} ({item.rol})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tabs de información adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Declaraciones */}
        <Card title="Declaraciones Recientes">
          <div className="space-y-2">
            {declaraciones.map((dec, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <div>
                  <p className="font-medium text-sm">{dec.tipo}</p>
                  <p className="text-xs text-text-muted">Periodo: {dec.periodo}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  dec.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                  dec.estado === 'EN_PROCESO' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {dec.estado}
                </span>
              </div>
            ))}
          </div>
          <Link href={`/clientes/${id}/declaraciones`} className="block text-center text-primary text-sm mt-4 hover:underline">
            Ver todas las declaraciones →
          </Link>
        </Card>

        {/* Accesos Rápidos */}
        <Card title="Accesos Rápidos">
          <div className="grid grid-cols-2 gap-3">
            <Link href={`/clientes/${id}/sunat`} className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>🏛️</span>
              <span className="text-sm">Estado SUNAT</span>
            </Link>
            <Link href={`/clientes/${id}/afp`} className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>💼</span>
              <span className="text-sm">Estado AFP</span>
            </Link>
            <Link href={`/clientes/${id}/tributos`} className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>💰</span>
              <span className="text-sm">Tributos</span>
            </Link>
            <Link href={`/clientes/${id}/ventas`} className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>📊</span>
              <span className="text-sm">Ventas</span>
            </Link>
            <Link href={`/clientes/${id}/asesorias`} className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>📅</span>
              <span className="text-sm">Asesorías</span>
            </Link>
            <Link href={`/clientes/${id}/cobranzas`} className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>💳</span>
              <span className="text-sm">Cobranzas</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

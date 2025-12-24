'use client';

import { Card, Button, Select } from '@/components/ui';

const clientesPorPlan = [
  { plan: 'Básico', cantidad: 15, porcentaje: 33 },
  { plan: 'Estándar', cantidad: 18, porcentaje: 40 },
  { plan: 'Premium', cantidad: 10, porcentaje: 22 },
  { plan: 'Enterprise', cantidad: 2, porcentaje: 5 },
];

const clientesPorRegimen = [
  { regimen: 'RUS', cantidad: 12, porcentaje: 27 },
  { regimen: 'RER', cantidad: 8, porcentaje: 18 },
  { regimen: 'MYPE', cantidad: 15, porcentaje: 33 },
  { regimen: 'General', cantidad: 10, porcentaje: 22 },
];

const resumenMensual = {
  declaracionesPresentadas: 42,
  declaracionesPendientes: 8,
  cobranzasRealizadas: 38,
  cobranzasPendientes: 7,
  asesoriasRealizadas: 25,
};

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Reportes</h1>
        <div className="flex gap-2">
          <Select
            options={[
              { value: '2025-01', label: 'Enero 2025' },
              { value: '2024-12', label: 'Diciembre 2024' },
              { value: '2024-11', label: 'Noviembre 2024' },
            ]}
          />
          <Button variant="outline">Exportar PDF</Button>
          <Button variant="outline">Exportar Excel</Button>
        </div>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <p className="text-3xl font-bold text-primary">45</p>
          <p className="text-sm text-text-muted">Clientes Activos</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-green-600">{resumenMensual.declaracionesPresentadas}</p>
          <p className="text-sm text-text-muted">Declaraciones Presentadas</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-yellow-600">{resumenMensual.declaracionesPendientes}</p>
          <p className="text-sm text-text-muted">Declaraciones Pendientes</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-blue-600">{resumenMensual.asesoriasRealizadas}</p>
          <p className="text-sm text-text-muted">Asesorías Realizadas</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-green-600">S/ 38,500</p>
          <p className="text-sm text-text-muted">Cobranzas del Mes</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clientes por Plan */}
        <Card title="Distribución por Plan de Servicio">
          <div className="space-y-4">
            {clientesPorPlan.map((item) => (
              <div key={item.plan}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.plan}</span>
                  <span className="text-sm text-text-muted">{item.cantidad} clientes ({item.porcentaje}%)</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      item.plan === 'Básico' ? 'bg-gray-500' :
                      item.plan === 'Estándar' ? 'bg-blue-500' :
                      item.plan === 'Premium' ? 'bg-purple-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Total Clientes</span>
              <span className="font-bold">45</span>
            </div>
          </div>
        </Card>

        {/* Clientes por Régimen */}
        <Card title="Distribución por Régimen Tributario">
          <div className="space-y-4">
            {clientesPorRegimen.map((item) => (
              <div key={item.regimen}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.regimen}</span>
                  <span className="text-sm text-text-muted">{item.cantidad} clientes ({item.porcentaje}%)</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      item.regimen === 'RUS' ? 'bg-green-500' :
                      item.regimen === 'RER' ? 'bg-blue-500' :
                      item.regimen === 'MYPE' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Estado de Declaraciones */}
        <Card title="Estado de Declaraciones - Enero 2025">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">8</p>
              <p className="text-xs text-text-muted">Pendientes</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-xs text-text-muted">En Proceso</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">42</p>
              <p className="text-xs text-text-muted">Presentadas</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="bg-yellow-500" style={{ width: '15%' }} />
              <div className="bg-blue-500" style={{ width: '9%' }} />
              <div className="bg-green-500" style={{ width: '76%' }} />
            </div>
          </div>
        </Card>

        {/* Estado de Cobranzas */}
        <Card title="Estado de Cobranzas - Diciembre 2024">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">S/ 2,100</p>
              <p className="text-xs text-text-muted">Pendiente</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">S/ 1,850</p>
              <p className="text-xs text-text-muted">Vencido</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">S/ 38,500</p>
              <p className="text-xs text-text-muted">Cobrado</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between">
              <span className="text-sm text-text-muted">Tasa de cobro</span>
              <span className="font-bold text-green-600">91%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Alertas y Pendientes */}
      <Card title="Alertas y Pendientes">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">⚠️</span>
              <span className="font-medium text-yellow-800">Clientes cerca del tope</span>
            </div>
            <p className="text-sm text-yellow-700">3 clientes RUS están al 80%+ del tope de ventas</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500">🔴</span>
              <span className="font-medium text-red-800">Cobranzas vencidas</span>
            </div>
            <p className="text-sm text-red-700">4 clientes con pagos vencidos por S/ 1,850</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-500">📅</span>
              <span className="font-medium text-blue-800">Vencimientos próximos</span>
            </div>
            <p className="text-sm text-blue-700">12 declaraciones vencen en los próximos 7 días</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-500">💼</span>
              <span className="font-medium text-purple-800">Asesorías agotadas</span>
            </div>
            <p className="text-sm text-purple-700">2 clientes han usado todas sus asesorías del mes</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

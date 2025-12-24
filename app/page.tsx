import { Card } from '@/components/ui';
import Link from 'next/link';

const stats = [
  { label: 'Clientes Activos', value: '45', icon: '👥', href: '/clientes' },
  { label: 'Declaraciones Pendientes', value: '12', icon: '📋', href: '/declaraciones' },
  { label: 'Tributos por Vencer', value: '8', icon: '💰', href: '/tributos' },
  { label: 'Cobranzas Pendientes', value: '15', icon: '💳', href: '/cobranzas' },
];

const proximosVencimientos = [
  { cliente: 'Empresa ABC S.A.C.', tipo: 'PDT 621', fecha: '2025-01-15', estado: 'PENDIENTE' },
  { cliente: 'Comercial XYZ E.I.R.L.', tipo: 'PLAME', fecha: '2025-01-17', estado: 'EN_PROCESO' },
  { cliente: 'Servicios 123 S.A.', tipo: 'Fraccionamiento', fecha: '2025-01-20', estado: 'PENDIENTE' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-text-muted">Bienvenido al CRM KQ Asesores & Contadores</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Próximos Vencimientos */}
      <Card title="Próximos Vencimientos" action={<Link href="/calendario" className="text-primary hover:underline text-sm">Ver calendario</Link>}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Tipo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Fecha</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Estado</th>
              </tr>
            </thead>
            <tbody>
              {proximosVencimientos.map((item, idx) => (
                <tr key={idx} className="border-b border-border last:border-0 hover:bg-bg">
                  <td className="py-3 px-4 text-sm">{item.cliente}</td>
                  <td className="py-3 px-4 text-sm">{item.tipo}</td>
                  <td className="py-3 px-4 text-sm">{item.fecha}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      item.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                      item.estado === 'EN_PROCESO' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.estado.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Acciones Rápidas">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/clientes/nuevo" className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>➕</span>
              <span className="text-sm">Nuevo Cliente</span>
            </Link>
            <Link href="/asesorias/nueva" className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>📅</span>
              <span className="text-sm">Agendar Asesoría</span>
            </Link>
            <Link href="/declaraciones" className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>📋</span>
              <span className="text-sm">Ver Declaraciones</span>
            </Link>
            <Link href="/reportes" className="flex items-center gap-2 p-3 rounded-lg bg-bg hover:bg-accent-light transition-colors">
              <span>📈</span>
              <span className="text-sm">Generar Reporte</span>
            </Link>
          </div>
        </Card>

        <Card title="Alertas Recientes">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <span className="text-yellow-500">⚠️</span>
              <div>
                <p className="text-sm font-medium">Tope de ventas próximo</p>
                <p className="text-xs text-text-muted">Empresa ABC está al 85% del tope RUS</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <span className="text-red-500">🔴</span>
              <div>
                <p className="text-sm font-medium">Cobranza vencida</p>
                <p className="text-xs text-text-muted">3 clientes con pagos pendientes</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

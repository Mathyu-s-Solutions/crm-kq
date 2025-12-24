'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/clientes', label: 'Clientes', icon: '👥' },
  { href: '/calendario', label: 'Calendario', icon: '📅' },
  { href: '/declaraciones', label: 'Declaraciones', icon: '📋' },
  { href: '/tributos', label: 'Tributos', icon: '💰' },
  { href: '/asesorias', label: 'Asesorías', icon: '💼' },
  { href: '/cobranzas', label: 'Cobranzas', icon: '💳' },
  { href: '/reportes', label: 'Reportes', icon: '📈' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col">
      <div className="p-6 border-b border-primary-light">
        <h1 className="text-xl font-bold">KQ Asesores</h1>
        <p className="text-sm text-accent-light opacity-80">& Contadores</p>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                    isActive
                      ? 'bg-primary-dark text-white'
                      : 'text-accent-light hover:bg-primary-dark hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
            U
          </div>
          <div>
            <p className="text-sm font-medium">Usuario</p>
            <p className="text-xs text-accent-light">Contador</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

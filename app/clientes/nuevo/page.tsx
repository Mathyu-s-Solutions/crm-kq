'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Input, Select } from '@/components/ui';

const regimenesTributarios = [
  { value: 'RUS', label: 'Régimen Único Simplificado (RUS)' },
  { value: 'RER', label: 'Régimen Especial de Renta (RER)' },
  { value: 'MYPE', label: 'Régimen MYPE Tributario' },
  { value: 'GENERAL', label: 'Régimen General' },
];

const regimenesLaborales = [
  { value: 'MICRO', label: 'Microempresa' },
  { value: 'PEQUEÑA', label: 'Pequeña Empresa' },
  { value: 'GENERAL', label: 'Régimen General' },
  { value: 'AGRARIO', label: 'Régimen Agrario' },
];

const planesServicio = [
  { value: 'BASICO', label: 'Básico' },
  { value: 'ESTANDAR', label: 'Estándar' },
  { value: 'PREMIUM', label: 'Premium' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
];

export default function NuevoClientePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ruc: '',
    razonSocial: '',
    titulares: '',
    email: '',
    telefono: '',
    regimenTributario: '',
    regimenLaboral: '',
    otrosRegistros: '',
    planServicio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el cliente
    console.log('Datos del cliente:', formData);
    router.push('/clientes');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/clientes" className="text-text-muted hover:text-text">
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold text-text">Nuevo Cliente</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card title="Datos Generales">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="RUC"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
              placeholder="20123456789"
              maxLength={11}
              required
            />
            <Input
              label="Razón Social"
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleChange}
              placeholder="Empresa S.A.C."
              required
            />
            <Input
              label="Titulares / Representantes"
              name="titulares"
              value={formData.titulares}
              onChange={handleChange}
              placeholder="Juan Pérez, María García"
            />
            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contacto@empresa.com"
            />
            <Input
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="999888777"
            />
            <Select
              label="Régimen Tributario"
              name="regimenTributario"
              value={formData.regimenTributario}
              onChange={handleChange}
              options={regimenesTributarios}
              required
            />
            <Select
              label="Régimen Laboral"
              name="regimenLaboral"
              value={formData.regimenLaboral}
              onChange={handleChange}
              options={regimenesLaborales}
            />
            <Select
              label="Plan de Servicio"
              name="planServicio"
              value={formData.planServicio}
              onChange={handleChange}
              options={planesServicio}
              required
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">
                Otros Registros
              </label>
              <textarea
                name="otrosRegistros"
                value={formData.otrosRegistros}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-bg-white"
                rows={3}
                placeholder="Información adicional del cliente..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
            <Link href="/clientes">
              <Button type="button" variant="outline">Cancelar</Button>
            </Link>
            <Button type="submit">Guardar Cliente</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

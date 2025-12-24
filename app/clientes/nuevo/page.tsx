'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Building2, User, Phone, Mail, FileText, Briefcase } from 'lucide-react';

export default function NuevoClientePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/clientes');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Nuevo Cliente"
        subtitle="Registrar un nuevo cliente en el sistema"
      />
      
      <div className="flex-1 p-6">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/clientes" className="gap-2 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Volver a clientes
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          {/* Datos de la Empresa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" />
                Datos de la Empresa
              </CardTitle>
              <CardDescription>Información principal del cliente</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ruc">RUC *</Label>
                  <Input 
                    id="ruc" 
                    placeholder="20123456789" 
                    maxLength={11}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razonSocial">Razón Social *</Label>
                  <Input 
                    id="razonSocial" 
                    placeholder="Empresa S.A.C."
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="titulares">Titulares / Representantes</Label>
                <Input 
                  id="titulares" 
                  placeholder="Juan Pérez, María García"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input 
                  id="direccion" 
                  placeholder="Av. Principal 123, Lima"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="contacto@empresa.com"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="telefono" 
                      placeholder="999 888 777"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Régimen y Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Régimen y Plan de Servicio
              </CardTitle>
              <CardDescription>
                El sistema desplegará automáticamente las obligaciones según el régimen seleccionado
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Régimen Tributario *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar régimen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUS">Régimen Único Simplificado (RUS)</SelectItem>
                      <SelectItem value="RER">Régimen Especial de Renta (RER)</SelectItem>
                      <SelectItem value="MYPE">Régimen MYPE Tributario</SelectItem>
                      <SelectItem value="GENERAL">Régimen General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Régimen Laboral</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar régimen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MICRO">Microempresa</SelectItem>
                      <SelectItem value="PEQUEÑA">Pequeña Empresa</SelectItem>
                      <SelectItem value="GENERAL">Régimen General</SelectItem>
                      <SelectItem value="AGRARIO">Régimen Agrario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Plan de Servicio *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BASICO">
                      <div className="flex flex-col">
                        <span>Básico</span>
                        <span className="text-xs text-muted-foreground">2 asesorías/mes</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ESTANDAR">
                      <div className="flex flex-col">
                        <span>Estándar</span>
                        <span className="text-xs text-muted-foreground">4 asesorías/mes</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="PREMIUM">
                      <div className="flex flex-col">
                        <span>Premium</span>
                        <span className="text-xs text-muted-foreground">8 asesorías/mes</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ENTERPRISE">
                      <div className="flex flex-col">
                        <span>Enterprise</span>
                        <span className="text-xs text-muted-foreground">Ilimitadas</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Información Adicional */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="h-5 w-5 text-primary" />
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="otrosRegistros">Otros Registros y Observaciones</Label>
                <Textarea 
                  id="otrosRegistros"
                  placeholder="Registro REMYPE, observaciones especiales, etc."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/clientes">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar Cliente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

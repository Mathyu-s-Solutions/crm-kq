'use client';

import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Users,
  Calendar,
  Wallet,
} from 'lucide-react';

const faqs = [
  {
    pregunta: '¿Cómo registro un nuevo cliente?',
    respuesta: 'Ve a la sección "Clientes" y haz clic en "Nuevo Cliente". Completa los datos requeridos como RUC, razón social, régimen tributario y plan de servicio.',
    icon: Users,
  },
  {
    pregunta: '¿Cómo funciona el calendario de vencimientos?',
    respuesta: 'El calendario muestra automáticamente todos los vencimientos de declaraciones, tributos y cobranzas. Los colores indican el tipo de vencimiento.',
    icon: Calendar,
  },
  {
    pregunta: '¿Cómo registro un pago de tributo?',
    respuesta: 'En la sección "Tributos", busca el tributo correspondiente, expande el cronograma y haz clic en "Pagar" en la cuota que deseas registrar.',
    icon: Wallet,
  },
  {
    pregunta: '¿Cómo genero reportes?',
    respuesta: 'La sección "Reportes" muestra métricas automáticas. Puedes exportar los datos usando el botón "Exportar" en la parte superior.',
    icon: FileText,
  },
];

export default function AyudaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Ayuda"
        subtitle="Centro de soporte"
      />
      
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-4xl">
        {/* Contacto rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Email</h3>
              <p className="text-xs text-muted-foreground mt-1">soporte@kqasesores.com</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Teléfono</h3>
              <p className="text-xs text-muted-foreground mt-1">+51 999 888 777</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Chat</h3>
              <p className="text-xs text-muted-foreground mt-1">Lun-Vie 9am-6pm</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <HelpCircle className="h-5 w-5 text-primary" />
              Preguntas Frecuentes
            </CardTitle>
            <CardDescription>Respuestas a las dudas más comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => {
                const Icon = faq.icon;
                return (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left text-sm">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-primary shrink-0" />
                        {faq.pregunta}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pl-7">
                      {faq.respuesta}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>

        {/* Documentación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              Documentación
            </CardTitle>
            <CardDescription>Guías y manuales del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <FileText className="h-4 w-4" />
              Manual de Usuario
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <FileText className="h-4 w-4" />
              Guía de Inicio Rápido
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <FileText className="h-4 w-4" />
              Regímenes Tributarios
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

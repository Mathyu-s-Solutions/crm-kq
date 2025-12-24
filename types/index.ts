// Tipos base del CRM

export type RegimenTributario = 
  | 'RUS' 
  | 'RER' 
  | 'MYPE' 
  | 'GENERAL';

export type RegimenLaboral = 
  | 'MICRO' 
  | 'PEQUEÑA' 
  | 'GENERAL' 
  | 'AGRARIO';

export type PlanServicio = 
  | 'BASICO' 
  | 'ESTANDAR' 
  | 'PREMIUM' 
  | 'ENTERPRISE';

export type EstadoDeclaracion = 
  | 'PENDIENTE' 
  | 'EN_PROCESO' 
  | 'PRESENTADO';

export type EstadoCuota = 
  | 'PENDIENTE' 
  | 'PAGADA' 
  | 'VENCIDA';

export type EstadoPago = 
  | 'PENDIENTE' 
  | 'PAGADO' 
  | 'VENCIDO';

export interface Cliente {
  id: string;
  ruc: string;
  razonSocial: string;
  titulares: string[];
  email: string;
  telefono: string;
  regimenTributario: RegimenTributario;
  regimenLaboral: RegimenLaboral;
  otrosRegistros?: string;
  planServicio: PlanServicio;
  fechaCreacion: Date;
  activo: boolean;
}

export interface Interaccion {
  id: string;
  clienteId: string;
  fecha: Date;
  tipo: 'COMENTARIO' | 'CONSULTA' | 'GESTION';
  descripcion: string;
  responsable: string;
  rolResponsable: 'ASISTENTE' | 'CONTADOR';
}

export interface TributoPendiente {
  id: string;
  clienteId: string;
  tipo: 'IGV' | 'FRACCIONAMIENTO' | 'MULTA' | 'RENTA' | 'OTRO';
  descripcion: string;
  montoTotal: number;
  numeroCuotas: number;
  cuotas: Cuota[];
}

export interface Cuota {
  id: string;
  tributoId: string;
  numeroCuota: number;
  monto: number;
  fechaVencimiento: Date;
  estado: EstadoCuota;
  fechaPago?: Date;
}

export interface DeclaracionMensual {
  id: string;
  clienteId: string;
  periodo: string; // formato: "2025-01"
  tipo: 'PDT621' | 'PLAME' | 'NRUS' | 'RENTA_4TA';
  estado: EstadoDeclaracion;
  fechaPresentacion?: Date;
}

export interface LibroContable {
  id: string;
  clienteId: string;
  periodo: string;
  tipo: 'MAYOR' | 'DIARIO' | 'BANCOS' | 'INVENTARIOS_BALANCES' | 'FLUJO_EFECTIVO';
  estado: EstadoDeclaracion;
}

export interface VentaMensual {
  id: string;
  clienteId: string;
  periodo: string;
  monto: number;
  acumuladoAnual: number;
}

export interface Asesoria {
  id: string;
  clienteId: string;
  fecha: Date;
  duracion: number; // en minutos
  descripcion: string;
  responsable: string;
}

export interface Cobranza {
  id: string;
  clienteId: string;
  periodo: string;
  monto: number;
  fechaEmision: Date;
  fechaVencimiento: Date;
  estado: EstadoPago;
  fechaPago?: Date;
}

export interface EstadoCuentaSUNAT {
  id: string;
  clienteId: string;
  fechaActualizacion: Date;
  deudaTotal: number;
  detalles: string;
}

export interface EstadoCuentaAFP {
  id: string;
  clienteId: string;
  afp: string;
  fechaActualizacion: Date;
  deudaTotal: number;
  detalles: string;
}

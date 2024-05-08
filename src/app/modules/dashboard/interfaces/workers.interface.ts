export interface Worker extends WorkerForm {
  id?: string;
  createdAt?: string;
}

export interface WorkerForm {
  name: string;
  cedula: string;
}

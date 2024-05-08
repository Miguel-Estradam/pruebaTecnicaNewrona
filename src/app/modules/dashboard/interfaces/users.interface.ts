export interface User extends UserForm {
  id: string;
}

export interface UserForm {
  name: string;
  email: string;
  rol?: string;
  password: string;
}

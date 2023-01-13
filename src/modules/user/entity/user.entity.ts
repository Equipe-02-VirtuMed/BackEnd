export class UserEntity {
  id?: string;
  name: string;
  image?: string;
  password: string;
  email: string;
  role: string;
  crm?: string;
  residency?: string;
  uf?: string;
  recoverPasswordToken?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

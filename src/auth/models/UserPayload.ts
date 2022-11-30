export interface UserPayload {
  sub: number | string;
  email: string;
  name: string;
  img: string;
  iat?: number;
}

import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const doctors: Prisma.DoctorCreateInput[] = [
  {
    email: 'johnsnow@gmail.com',
    name: 'Billy Butcher',
    password: 'Abcd@1234',
    image: 'https://avatars.githubusercontent.com/u/88009922?v=4',
    residency: 'Cardiologista',
  },
];

export const doctor = async (prisma: PrismaClient) => {
  for (const obj of Object.values(doctors)) {
    await prisma.doctor.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
      },
    });
  }
};

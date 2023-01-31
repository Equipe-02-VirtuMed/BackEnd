import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UserCreateInput[] = [
  {
    email: 'johnsnow@gmail.com',
    name: 'Amaro Francisco',
    role: 'Pacient',
    crm: '',
    residency: '',
    uf: '',
    password: 'Abcd@1234',
    image: 'https://avatars.githubusercontent.com/u/88009922?v=4',
  },

  {
    email: 'adoctornow@gmail.com',
    name: 'Amaro Francisco',
    role: 'Doctor',
    crm: '01.2345678-9',
    residency: 'Cardiologia',
    uf: 'RJ',
    password: 'Abcd@1234',
    image: 'https://avatars.githubusercontent.com/u/88009922?v=4',
  },

  {
    email: 'abarssnow@gmail.com',
    name: 'Amaro Francisco',
    role: 'Pacient',
    crm: '',
    residency: '',
    uf: '',
    password: 'Abcd@1234',
    image: 'https://avatars.githubusercontent.com/u/88009922?v=4',
  },

  {
    email: 'oramanow@gmail.com',
    name: 'Amaro Francisco',
    role: 'Doctor',
    crm: '01.2345678-9',
    residency: 'Cardiologia',
    uf: 'RJ',
    password: 'Abcd@1234',
    image: 'https://avatars.githubusercontent.com/u/88009922?v=4',
  },

  {
    email: 'amaro_ribeir0@hotmail.com',
    name: 'Amaro Francisco',
    role: 'Admin',
    crm: '01.2345678-9',
    residency: 'Neurocirurgião',
    uf: 'RJ',
    password: 'Abcd@1234',
    image: 'https://avatars.githubusercontent.com/u/88009922?v=4',
  },
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
      },
    });
  }
};

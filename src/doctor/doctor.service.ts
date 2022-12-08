import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { handleError } from 'src/utils/handle-error.util';
import { Doctor } from './entities/doctor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  private doctorSelect = {
    id: true,
    email: true,
    name: true,
    password: false,
    image: true,
    residency: true,
    crm: true,
    uf: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany({
      select: this.doctorSelect,
    });
  }

  async findById(id: string): Promise<Doctor> {
    const record = await this.prisma.doctor.findUnique({
      where: { id },
      select: this.doctorSelect,
    });

    if (!record) {
      throw new NotFoundException(`Register with the id:'${id}' not found.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Doctor> {
    return this.findById(id);
  }

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('The password is incorrect.');
    }

    delete dto.confirmPassword;
    const data: Doctor = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.doctor
      .create({ data, select: this.doctorSelect })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateDoctorDto): Promise<Doctor> {
    await this.findById(id);
    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('The passwords are not the same.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<Doctor> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.doctor
      .update({
        where: { id },
        data,
        select: this.doctorSelect,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.doctor.delete({ where: { id } });
  }
}

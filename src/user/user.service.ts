import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from 'src/utils/handle-error.util';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    email: true,
    name: true,
    password: false,
    image: true,
    createdAt: true,
    updatedAt: true,
  }; //this selects the patter in the constructor below what is to be returned when searched. this is the info that can be taken from the database is as true, but what can't be taken is as false. Notice how the userSelect is used in the code below for further undestanding.

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    }); //return all the items in the prisma.user
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    }); //return the item where the value id is equal to the one informed from the prisma.user

    if (!record) {
      throw new NotFoundException(`Register with the id:'${id}' not found.`);
    }

    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      //it's checking here if the password is correct
      throw new BadRequestException('The password is incorrect.'); // if it's incorrect, this returns.
    }

    delete dto.confirmPassword; // this serves to delete an item from the dto, so deleting the confirmPassword.
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10), // this is how you use bcrypt, using await and bcrypt.hash(password), the number is unecessary as the number of rounds needed to run is by default the 10, but hey, you wanna be a know it all...
    }; //this creates an item called user that has an id(as optional in the entity) and all the info from the createUserDto using the spread(...) operator. If you name the receiving as data, you can just use the data in the create method, since the key and value is of the same name

    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleError); // this returns the new data user(since it has the name data you can just write data instead of data:data) to the prisma user with the id getting created automatically with the ORM. If an error occurs it prints the error and returns undefined.
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    if (dto.password) {
      //checks if the dto you are using has a password
      if (dto.password != dto.confirmPassword) {
        // if it has a password is it correct?
        throw new BadRequestException('The passwords are not the same.');
      }
    }

    delete dto.confirmPassword; //deletes the need to confirm it again

    const data: Partial<User> = { ...dto }; // here you are using the Partial <> to turn every value within, in this case the user, into optional values

    if (data.password) {
      //encrypts the password
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.user
      .update({
        //updates the item where the id is the same with the info included in data
        where: { id },
        data,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } }); //deletes this item from the user
  }
}

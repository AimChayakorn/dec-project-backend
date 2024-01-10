/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
export interface User {
  id: string;
  user: string;
  password: string;
  email: string;
}

@Injectable()

export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async findUserById(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { user: username },
    });
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    const saltRound = 10;
    const hash = await bcrypt.hash(password, saltRound)
    const user = this.prisma.user.create({
      data: {
        user: username,
        password: hash,
        email: email,
      },
    });
    return user;
  }
}

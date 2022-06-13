import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByCredential(
    where: Prisma.FederatedCredentialWhereUniqueInput,
  ): Promise<User | null> {
    const credential = await this.prisma.federatedCredential.findUnique({
      where,
      include: {
        user: true,
      },
    });

    if (!credential) {
      return null;
    }

    return credential.user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
}

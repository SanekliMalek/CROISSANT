import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.teamMember.findMany();
  }

  async findOne(id: string) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Membre introuvable');
    return member;
  }

  create(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({ data: dto });
  }

  async update(id: string, dto: UpdateTeamMemberDto) {
    await this.findOne(id);
    return this.prisma.teamMember.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.teamMember.delete({ where: { id } });
    return { success: true, message: 'Membre supprimé' };
  }
}

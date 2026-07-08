import { Injectable, NotFoundException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdhesionDto, UpdateAdhesionStatusDto } from './dto/adhesion.dto';

type AdhesionRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  profession: string;
  interests: unknown;
  preferredSlots: unknown;
  status: string;
  createdAt: Date;
};

@Injectable()
export class AdhesionService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.adhesion.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.adhesion.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Candidature introuvable');
    return item;
  }

  create(dto: CreateAdhesionDto) {
    return this.prisma.adhesion.create({
      data: {
        ...dto,
        status: 'pending',
      },
    });
  }

  async updateStatus(id: string, dto: UpdateAdhesionStatusDto) {
    const previous = await this.findOne(id);
    const updated = await this.prisma.adhesion.update({
      where: { id },
      data: { status: dto.status },
    });

    if (previous.status !== 'approved' && dto.status === 'approved') {
      this.sendApprovalEmail(updated as AdhesionRecord).catch((error) => {
        console.error('Approval email failed:', error);
      });
    }

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.adhesion.delete({ where: { id } });
    return { success: true, message: 'Candidature supprimÃ©e' };
  }

  private getMailer() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return null;
    }

    return createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    });
  }

  private async sendApprovalEmail(adhesion: AdhesionRecord) {
    const transporter = this.getMailer();
    if (!transporter) {
      console.warn(
        'SMTP settings are missing. Skipping adhesion approval email for',
        adhesion.email,
      );
      return;
    }

    const from =
      process.env.SMTP_FROM ||
      'Croissant-Rouge Gafsa <no-reply@croissant-rouge-gafsa.org.tn>';
    const fullName = `${adhesion.firstName} ${adhesion.lastName}`.trim();

    await transporter.sendMail({
      from,
      to: adhesion.email,
      subject: 'Votre demande de volontariat a été approuvée',
      text: `Bonjour ${fullName},\n\nNous avons le plaisir de vous informer que votre demande d'adhésion au Croissant-Rouge de Gafsa a été approuvée.\n\nMerci pour votre engagement.\n\nCordialement,\nCroissant-Rouge de Gafsa`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f1f1f;">
          <p>Bonjour ${fullName},</p>
          <p>Nous avons le plaisir de vous informer que votre demande d'adhésion au Croissant-Rouge de Gafsa a été approuvée.</p>
          <p>Merci pour votre engagement et votre confiance.</p>
          <p>Cordialement,<br />Croissant-Rouge de Gafsa</p>
        </div>
      `,
    });
  }
}

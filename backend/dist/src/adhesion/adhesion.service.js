"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdhesionService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const prisma_service_1 = require("../prisma/prisma.service");
let AdhesionService = class AdhesionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.adhesion.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const item = await this.prisma.adhesion.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Candidature introuvable');
        return item;
    }
    create(dto) {
        return this.prisma.adhesion.create({
            data: {
                ...dto,
                status: 'pending',
            },
        });
    }
    async updateStatus(id, dto) {
        const previous = await this.findOne(id);
        const updated = await this.prisma.adhesion.update({
            where: { id },
            data: { status: dto.status },
        });
        if (previous.status !== 'approved' && dto.status === 'approved') {
            this.sendApprovalEmail(updated).catch((error) => {
                console.error('Approval email failed:', error);
            });
        }
        return updated;
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.adhesion.delete({ where: { id } });
        return { success: true, message: 'Candidature supprimÃ©e' };
    }
    getMailer() {
        const host = process.env.SMTP_HOST;
        const port = Number(process.env.SMTP_PORT || 587);
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        if (!host || !user || !pass) {
            return null;
        }
        return (0, nodemailer_1.createTransport)({
            host,
            port,
            secure: process.env.SMTP_SECURE === 'true',
            auth: { user, pass },
        });
    }
    async sendApprovalEmail(adhesion) {
        const transporter = this.getMailer();
        if (!transporter) {
            console.warn('SMTP settings are missing. Skipping adhesion approval email for', adhesion.email);
            return;
        }
        const from = process.env.SMTP_FROM ||
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
};
exports.AdhesionService = AdhesionService;
exports.AdhesionService = AdhesionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdhesionService);
//# sourceMappingURL=adhesion.service.js.map
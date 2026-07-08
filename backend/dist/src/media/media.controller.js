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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const path_1 = require("path");
const multer_1 = require("multer");
function ensureUploadDir() {
    const uploadDir = (0, path_1.join)(process.cwd(), 'uploads');
    if (!(0, fs_1.existsSync)(uploadDir)) {
        (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
    }
    return uploadDir;
}
function sanitizeName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
}
let MediaController = class MediaController {
    uploadImage(file, req) {
        if (!file) {
            throw new common_1.BadRequestException('Image file is required');
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        return {
            success: true,
            url: `${baseUrl}/uploads/${file.filename}`,
            filename: file.filename,
        };
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, callback) => callback(null, ensureUploadDir()),
            filename: (_req, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const baseName = sanitizeName(file.originalname.replace((0, path_1.extname)(file.originalname), '')) || 'image';
                callback(null, `${baseName}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (_req, file, callback) => {
            if (!file.mimetype.startsWith('image/')) {
                return callback(new common_1.BadRequestException('Only image files are allowed'), false);
            }
            callback(null, true);
        },
        limits: { fileSize: 8 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "uploadImage", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media')
], MediaController);
//# sourceMappingURL=media.controller.js.map
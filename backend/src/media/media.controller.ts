import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { diskStorage } from 'multer';

function ensureUploadDir() {
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
}

function sanitizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

@Controller('media')
export class MediaController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (
          _req: Request,
          _file: Express.Multer.File,
          callback: (error: Error | null, destination: string) => void,
        ) => callback(null, ensureUploadDir()),
        filename: (
          _req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const baseName =
            sanitizeName(
              file.originalname.replace(extname(file.originalname), ''),
            ) || 'image';
          callback(
            null,
            `${baseName}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (
        _req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: 8 * 1024 * 1024 },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return {
      success: true,
      url: `${baseUrl}/uploads/${file.filename}`,
      filename: file.filename,
    };
  }
}

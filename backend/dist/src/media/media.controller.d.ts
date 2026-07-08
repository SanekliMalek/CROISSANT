import type { Request } from 'express';
export declare class MediaController {
    uploadImage(file: Express.Multer.File, req: Request): {
        success: boolean;
        url: string;
        filename: string;
    };
}

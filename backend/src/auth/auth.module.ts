import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AuthController, AdminController],
  providers: [AuthService],
})
export class AuthModule {}

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AssistantDto } from './dto/assistant.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('assistant')
  @HttpCode(HttpStatus.OK)
  async assistant(@Body() assistantDto: AssistantDto) {
    return this.authService.runAssistant(assistantDto);
  }
}

import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class AssistantDto {
  @IsString()
  @IsNotEmpty()
  prompt!: string;

  @IsArray()
  @IsOptional()
  history?: { role: 'user' | 'assistant'; content: string }[];
}

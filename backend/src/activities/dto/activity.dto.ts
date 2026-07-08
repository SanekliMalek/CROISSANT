import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery?: string[];

  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @Type(() => Number)
  @IsNumber()
  targetAmount!: number;

  @Type(() => Number)
  @IsNumber()
  raisedAmount!: number;

  @Type(() => Number)
  @IsNumber()
  beneficiaries!: number;

  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsString()
  @IsNotEmpty()
  details!: string;
}

export class UpdateActivityDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery?: string[];

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  targetAmount?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  raisedAmount?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  beneficiaries?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  details?: string;
}

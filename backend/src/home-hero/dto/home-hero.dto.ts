import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertHomeHeroDto {
  @IsString()
  @IsNotEmpty()
  badge!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;
}

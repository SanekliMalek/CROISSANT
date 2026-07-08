import { IsString, IsNotEmpty, IsArray, IsIn } from 'class-validator';

export class CreateAdhesionDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  birthDate!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  profession!: string;

  @IsArray()
  @IsNotEmpty()
  interests!: string[];

  @IsArray()
  @IsNotEmpty()
  preferredSlots!: string[];
}

export class UpdateAdhesionStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['pending', 'approved', 'rejected'])
  status!: string;
}

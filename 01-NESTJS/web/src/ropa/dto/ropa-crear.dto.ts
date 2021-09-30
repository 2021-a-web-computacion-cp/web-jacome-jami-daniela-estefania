import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RopaCrearDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  tipoRopa: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  talla: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  marca: string;

  @IsOptional()
  @IsBoolean()
  sexo: boolean;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  color: string;

  @IsOptional()
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  fecha: Date;
}

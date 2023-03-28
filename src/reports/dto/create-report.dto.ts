import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class CreateReportDto {
  @IsString()
  price: string;
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1935)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(100000)
  milage: number;
}

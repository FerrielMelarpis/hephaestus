import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

export class CreateBotDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(1, 64)
  name: string;

  @IsNotEmpty()
  @Length(1, 1024)
  purpose: string;
}

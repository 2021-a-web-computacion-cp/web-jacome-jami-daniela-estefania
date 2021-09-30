import { Module } from '@nestjs/common';
import { RopaService } from './ropa.service';
import { PrismaService } from '../prisma.service';
import { RopaController } from './ropa.controller';

@Module({
  imports: [
    // modulos importados
  ],
  providers: [RopaService, PrismaService],
  exports: [
    // exportamos servicio
    RopaService,
  ],
  controllers: [
    // declaramos controladores
    RopaController,
  ],
})
export class RopaModule {}

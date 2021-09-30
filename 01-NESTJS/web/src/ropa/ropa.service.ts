import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RopaService {
  constructor(
    // Inyectar dependencias
    private prisma: PrismaService,
  ) {}
  //SEARCH
  buscarUno(id: number) {
    return this.prisma.ropa.findUnique({
      where: { id: id },
    });
  }

  //CREATE
  crearUno(ropa: Prisma.RopaCreateInput) {
    return this.prisma.ropa.create({
      data: ropa,
    });
  }

  //UPDATE
  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.RopaUpdateInput;
  }) {
    return this.prisma.ropa.update({
      data: parametrosActualizar.data,
      where: { id: parametrosActualizar.id },
    });
  }

  //DELETE
  eliminarUno(id: number) {
    return this.prisma.ropa.delete({
      where: { id: id },
    });
  }

  buscarMuchos(parametrosBusqueda: {
    skip?: number; //Registros que te saltas
    take?: number; //Registros que tomas
    busqueda?: string; // Lo que el usuario busca
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { tipoRopa: { contains: parametrosBusqueda.busqueda } },
            { talla: { contains: parametrosBusqueda.busqueda } },
            { marca: { contains: parametrosBusqueda.busqueda } },
            { sexo: { contains: parametrosBusqueda.busqueda } },
            { color: { contains: parametrosBusqueda.busqueda } },
            { stock: { contains: parametrosBusqueda.busqueda } },
            { precio: { contains: parametrosBusqueda.busqueda } },
            { fecha: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.ropa.findMany({
      //    where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }
}

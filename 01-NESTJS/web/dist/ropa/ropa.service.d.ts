import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class RopaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__RopaClient<import(".prisma/client").Ropa>;
    crearUno(ropa: Prisma.RopaCreateInput): Prisma.Prisma__RopaClient<import(".prisma/client").Ropa>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.RopaUpdateInput;
    }): Prisma.Prisma__RopaClient<import(".prisma/client").Ropa>;
    eliminarUno(id: number): Prisma.Prisma__RopaClient<import(".prisma/client").Ropa>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Ropa[]>;
}

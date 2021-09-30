import { RopaService } from './ropa.service';
export declare class RopaController {
    private ropaService;
    constructor(ropaService: RopaService);
    inicio(response: any): void;
    listaRopa(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, queryParams: any): void;
    crearRopa(response: any, bodyParams: any): Promise<void>;
    elminarRopa(response: any, routeParams: any): Promise<void>;
    vistaActualizar(response: any, parametrosRuta: any): Promise<void>;
    editarRopa(parametrosRuta: any, bodyParams: any, response: any): Promise<any>;
    obtenerUno(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__RopaClient<import(".prisma/client").Ropa>;
    actualizarRopa(bodyParams: any, paramRuta: any): import(".prisma/client").Prisma.Prisma__RopaClient<import(".prisma/client").Ropa>;
    eliminarRopa(paramRuta: any): import(".prisma/client").Prisma.Prisma__RopaClient<import(".prisma/client").Ropa>;
    crearUno(bodyParams: any): Promise<import(".prisma/client").Ropa>;
}

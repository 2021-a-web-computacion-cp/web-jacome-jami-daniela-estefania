import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    suma(params: any, req: any, res: any): {
        parametros: any;
        resultadoSuma: string;
        cookie: any;
    };
    resta(bodyParams: any, headers: any, req: any, res: any): {
        parametros: any;
        resultadoResta: string;
        cookie: any;
    };
    multiplicacion(params: any, req: any, res: any): {
        parametros: any;
        resultadoMultiplicacion: string;
        cookie: any;
    };
    division(params: any, req: any, res: any): {
        parametros: any;
        resultadoDivision: string;
        cookie: any;
    };
    getHello(): string;
    holaTexto(): string;
    holaHTML(): string;
    holaJSON(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    parametrosConsulta(queryParams: any, params: any): {
        parametrosConsulta: any;
        parametrosRuta: any;
    };
    parametrosCuerpo(bodyParams: any, cabecerasPeticion: any): {
        parametrosCuerpo: any;
        cabeceras: any;
    };
}

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('suma') //Suma con get y query params
  @HttpCode(200)
  suma(@Query() params, @Req() req, @Res({ passthrough: true }) res) {
    const parametros = params;

    const numero1 = Number(parametros['numero1'].toString());
    const numero2 = Number(parametros['numero2'].toString());
    const resultadoSumaNumber: number = numero1 + numero2;
    const resultadoSuma = String(resultadoSumaNumber);
    const cookieSuma = req.cookies;
    const numero = cookieSuma['Total'];
    if (numero == undefined) {
      const res_new = 100 - resultadoSumaNumber;
      res.cookie(
        'Total', //Nombre
        100, // Valor
        {
          signed: true,
        },
      );
      cookieSuma['Total'] = String(res_new);
    } else {
      const res_new = Number(numero) - resultadoSumaNumber;
      if (res_new > 0) {
        cookieSuma['Total'] = String(res_new);
        res.cookie('Total', String(res_new));
      } else {
        res.cookie('Total', '100');
        cookieSuma['Total'] = '100';
        res.send('Terminaste el juego');
      }
    }

    return {
      parametros,
      resultadoSuma,
      cookieSuma,
    };
  }

  @Post('resta')
  @HttpCode(201)
  resta(
    @Body() bodyParams,
    @Headers() headers,
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    const parametros = bodyParams;
    const numero1 = Number(parametros['numero1'].toString());
    const numero2 = Number(parametros['numero2'].toString());

    const resultadoRestaNumber: number = numero1 - numero2;
    const resultadoResta = String(resultadoRestaNumber);
    const cookieResta = req.cookies;
    const numero = cookieResta['Total'];
    if (numero == undefined) {
      const res_new = 100 - resultadoRestaNumber;
      res.cookie(
        'Total', //Nombre
        100, // Valor
        {
          signed: true,
        },
      );
      cookieResta['Total'] = String(res_new);
    } else {
      const res_new = Number(numero) - resultadoRestaNumber;
      if (res_new > 0) {
        cookieResta['Total'] = String(res_new);
        res.cookie('Total', String(res_new));
      } else {
        res.cookie('Total', '100');
        cookieResta['Total'] = '100';
        res.send('Terminaste el juego');
      }
    }

    return {
      parametros,
      resultadoResta,
      cookieResta,
    };
  }

  @Put('multiplicacion')
  @HttpCode(200)
  multiplicacion(@Body() params, @Req() req, @Res({ passthrough: true }) res) {
    const parametros = params;
    const numero1 = Number(parametros['numero1'].toString());
    const numero2 = Number(parametros['numero2'].toString());

    const resultadoMultiplicacionNumber: number = numero1 * numero2;
    const resultadoMultiplicacion = String(resultadoMultiplicacionNumber);
    const cookieMultiplicacion = req.cookies;
    const numero = cookieMultiplicacion['Total'];
    if (numero == undefined) {
      const res_new = 100 - resultadoMultiplicacionNumber;
      res.cookie(
        'Total', //Nombre
        100, // Valor
        {
          signed: true,
        },
      );
      cookieMultiplicacion['Total'] = String(res_new);
    } else {
      const res_new = Number(numero) - resultadoMultiplicacionNumber;
      if (res_new > 0) {
        cookieMultiplicacion['Total'] = String(res_new);
        res.cookie('Total', String(res_new));
      } else {
        res.cookie('Total', '100');
        cookieMultiplicacion['Total'] = '100';
        res.send('Terminaste el juego');
      }
    }

    return {
      parametros,
      resultadoMultiplicacion,
      cookieMultiplicacion,
    };
  }

  @Get('division/:numero1/:numero2')
  @HttpCode(201)
  division(@Param() params, @Req() req, @Res({ passthrough: true }) res) {
    const parametros = params;
    const numero1 = Number(parametros['numero1'].toString());
    const numero2 = Number(parametros['numero2'].toString());

    const resultadoDivisionNumber: number = numero1 / numero2;
    const resultadoDivision = String(resultadoDivisionNumber);
    const cookieDivision = req.cookies;
    const numero = cookieDivision['Total'];
    if (numero == undefined) {
      const res_new = 100 - resultadoDivisionNumber;
      res.cookie(
        'Total', //Nombre
        100, // Valor
        {
          signed: true,
        },
      );
      cookieDivision['Total'] = String(res_new);
    } else {
      const res_new = Number(numero) - resultadoDivisionNumber;
      if (res_new > 0) {
        cookieDivision['Total'] = String(res_new);
        res.cookie('Total', String(res_new));
      } else {
        res.cookie('Total', '100');
        cookieDivision['Total'] = '100';
        res.send('Terminaste el juego');
      }
    }

    return {
      parametros,
      resultadoDivision,
      cookieDivision,
    };
  }

  //GET metodo http
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'HOLA TEXTO';
  }

  @Get('html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }

  @Get('json')
  @HttpCode(200)
  holaJSON(): string {
    return '{mensaje: "Hola json" }';
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //  request - PETICION
    @Res() res, //  response - RESPUESTA
  ) {
    res.cookie(
      'galletaInsegura', // nombre
      'Tengo hambre', // valor
    );
    res.cookie(
      'galletaSeguraYFirmada', // nombre
      'Web :3', // valor
      {
        secure: true, // solo se transfiera por canales confiables https
        signed: true, // Encriptacion
      },
    );
    res.send('ok'); // return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    // req.signedCookies.total
    return mensaje;
  }

  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') // Cabeceras de respuesta (response headers)
  @Header('EPN', 'SISTEMAS') // Cabeceras de respuesta (response headers)
  parametrosConsulta(@Query() queryParams, @Param() params) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('parametros-cuerpo') // 201
  @HttpCode(200)
  parametrosCuerpo(@Body() bodyParams, @Headers() cabecerasPeticion) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
}

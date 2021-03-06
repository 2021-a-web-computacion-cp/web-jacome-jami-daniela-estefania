import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { RopaService } from './ropa.service';
import { RopaCrearDto } from './dto/ropa-crear.dto';
import { validate } from 'class-validator';

@Controller('ropa')
export class RopaController {
  constructor(
    //inyeccion dependencias
    private ropaService: RopaService,
  ) {}
  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }
  @Get('lista-ropa') //!! BUSCAR - IMPLIMIR
  async listaRopa(@Res() response, @Query() parametrosConsulta) {
    try {
      //Validar parametros de consulta con un dto (TODO)
      const respuesta = await this.ropaService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log('IMPRIMIR');
      console.log(respuesta);
      response.render('ropa/lista', {
        datos: {
          ropa: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }
  //***** VISTAS *******
  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() queryParams) {
    console.log('VISTA CREAR');
    response.render('ropa/crear', {
      datos: {
        mensaje: queryParams.mensaje,
      },
    });
  }

  @Post('crear-ropa-formulario') //CREAR
  async crearRopa(@Res() response, @Body() bodyParams) {
    let sexo = false;
    if (bodyParams.sexo == 'Femenino') {
      sexo = true;
    }
    try {
      const ropaRes = await this.ropaService.crearUno({
        tipoRopa: bodyParams.tipoRopa,
        talla: bodyParams.talla,
        marca: bodyParams.marca,
        sexo: sexo,
        color: bodyParams.color,
        precio: Number(bodyParams.precio),
        stock: Number(bodyParams.stock),
      });
      response.redirect(
        '/ropa/vista-crear' +
          '?mensaje=Se ingreso exitosamente la prenda ' +
          bodyParams.tipoRopa,
      );
      console.log('ROPA FORMULARIO');
      console.log(ropaRes);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Post('eliminar-ropa/:idRopa') //!!ELIMINAR
  async elminarRopa(@Res() response, @Param() routeParams) {
    try {
      await this.ropaService.eliminarUno(+routeParams.idRopa);
      response.redirect(
        '/ropa/lista-ropa' + '?mensaje=Se elimin?? prenda seleccionada',
      );
      console.log('eLIMINAT ROPA');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Post('vista-editar/:idRopa')
  async vistaActualizar(@Res() response, @Param() parametrosRuta) {
    try {
      const respuesta = await this.ropaService.buscarUno(
        +parametrosRuta.idRopa,
      );
      console.log('VISTA EDITAR');
      console.log(respuesta);
      response.render('ropa/editar', {
        datos: {
          ropa: respuesta,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }
  @Post('editar-ropa-formulario/:idRopa')
  async editarRopa(
    @Param() parametrosRuta,
    @Body() bodyParams,
    @Res() response,
  ) {
    let sexo = false;
    if (bodyParams.sexo == 'Femenino') {
      sexo = true;
    }
    console.log('EDITAR');
    const id = +parametrosRuta.idRopa;
    const fecha = new Date();

    const ropaCrearDto = new RopaCrearDto();
    ropaCrearDto.tipoRopa = bodyParams.tipoRopa;
    ropaCrearDto.talla = bodyParams.talla;
    ropaCrearDto.marca = bodyParams.marca;
    ropaCrearDto.sexo = sexo;
    ropaCrearDto.color = bodyParams.color;
    ropaCrearDto.precio = Number(bodyParams.precio);
    ropaCrearDto.stock = Number(bodyParams.stock);
    ropaCrearDto.fecha = new Date(bodyParams.fecha);
    console.log(typeof ropaCrearDto.precio);
    console.log(typeof ropaCrearDto.stock);
    console.log(typeof ropaCrearDto.sexo);
    console.log(typeof ropaCrearDto.fecha);
    console.log(ropaCrearDto.sexo);
    console.log(ropaCrearDto.fecha);
    try {
      const errores = await validate(ropaCrearDto);
      console.log(errores.length);
      if (errores.length > 0) {
        console.error('Error', errores);
        return response.redirect(
          '/ropa/lista-ropa/' + '?mensaje=Error validando datos',
        );
      } else {
        const data = {
          tipoRopa: ropaCrearDto.tipoRopa,
          talla: ropaCrearDto.talla,
          marca: ropaCrearDto.marca,
          sexo: ropaCrearDto.sexo,
          color: ropaCrearDto.color,
          precio: Number(ropaCrearDto.precio),
          stock: Number(ropaCrearDto.stock),
          fecha: new Date(ropaCrearDto.fecha),
        };
        await this.ropaService.actualizarUno({
          id: id,
          data: data,
        });
        response.redirect(
          '/ropa/lista-ropa' +
            '?mensaje= Se actualiz?? exitosamente la prenda ' +
            '' +
            bodyParams.tipoRopa,
        );
      }
    } catch (e) {
      console.error({ error: e, mensaje: 'Errores en editar la prenda' });
      throw new InternalServerErrorException('error de servidor');
    }
  }

  @Get(':idRopa')
  obtenerUno(@Param() parametrosRuta) {
    return this.ropaService.buscarUno(+parametrosRuta.idRopa);
  }

  //actualizar
  @Put(':idRopa')
  actualizarRopa(@Body() bodyParams, @Param() paramRuta) {
    return this.ropaService.actualizarUno({
      id: +paramRuta.idRopa,
      data: bodyParams,
    });
  }

  //borrar
  @Delete(':idRopa')
  eliminarRopa(@Param() paramRuta) {
    const id = Number(paramRuta.idRopa);

    return this.ropaService.eliminarUno(id);
  }

  @Post('crear')
  async crearUno(@Body() bodyParams) {
    let sexo = false;
    if (bodyParams.sexo == 'Femenino') {
      sexo = true;
    }
    const ropaCrearDto = new RopaCrearDto();
    ropaCrearDto.tipoRopa = bodyParams.tipoRopa;
    ropaCrearDto.talla = bodyParams.talla;
    ropaCrearDto.marca = bodyParams.marca;
    ropaCrearDto.sexo = sexo;
    ropaCrearDto.color = bodyParams.color;
    ropaCrearDto.precio = bodyParams.precio.toNumber();
    ropaCrearDto.stock = bodyParams.stock.toNumber();
    ropaCrearDto.fecha = bodyParams.fecha;
    try {
      //errores validacion
      const errores = await validate(ropaCrearDto); //para validar validate
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien parametros');
      } else {
        return this.ropaService.crearUno(ropaCrearDto);
      }
    } catch (error) {
      //error de servidor
      console.error({ error: error, mensaje: 'Errores en ingresar ropa' });
      throw new InternalServerErrorException('Error servidor');
    }
  }
}

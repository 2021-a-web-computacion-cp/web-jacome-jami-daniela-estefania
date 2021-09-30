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
import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import internal from 'stream';
import { validate } from 'class-validator';
import { takeWhile } from 'rxjs';
@Controller('usuario')
export class UsuarioController {
  constructor(
    // Inyeccion dependencias
    private usuarioService: UsuarioService,
  ) {}
  //VISTAS----------
  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('lista-usuarios') //!! BUSCAR - IMPLIMIR LISTA
  /*listaUsuarios(@Res() response) {
    response.render('usuario/lista');
  }*/
  async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
    try {
      //Validar parametros de consulta con un dto (TODO)
      const respuesta = await this.usuarioService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log('lista usuario' + true);
      console.log(respuesta);
      response.render('usuario/lista', {
        datos: {
          usuarios: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() qqueryParams) {
    response.render('usuario/crear', {
      datos: {
        mensaje: qqueryParams.mensaje,
      },
    });
  }

  @Post('crear-usuario-formulario') //!! CREAR
  async crearUsuario(@Res() response, @Body() bodyParams) {
    //si se usa el response no debe utilizar return
    try {
      const userRes = await this.usuarioService.crearUno({
        nombre: bodyParams.nombre,
        apellido: bodyParams.apellido,
      });
      //response.send(userRes); -> ENVIA LA BASE LOS DATOS PERO DEVUELVE JSON
      response.redirect(
        '/usuario/vista-crear' +
          '?mensaje=Se creo el usuario ' +
          bodyParams.nombre,
      );
      console.log('USUARIO FORMULARIO');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Post('eliminar-usuario/:idUsuario') //!!ELIMINAR
  async elminarUsuario(@Res() response, @Param() routeParams) {
    try {
      await this.usuarioService.eliminarUno(+routeParams.idUsuario);
      response.redirect(
        '/usuario/lista-usuarios' + '?mensaje=Se elimino el usuario',
      );
      console.log('ELIMINAR USUARIO');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }
  //*********************************************
  @Get(':idUsuario')
  obtenerUno(@Param() parametrosRuta) {
    console.log('obtenerUno' + parametrosRuta.idUsuario);
    return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
  }

  //actualizar
  @Put(':idUsuario')
  actualizarUno(@Body() bodyParams, @Param() paramRuta) {
    return this.usuarioService.actualizarUno({
      id: +paramRuta.idUsuario,
      data: bodyParams,
    });
  }

  @Delete(':idUsuario')
  eliminarUno(@Param() paramRuta) {
    const id = Number(paramRuta.idUsuario);
    return this.usuarioService.eliminarUno(id);
  }

  @Post('crear')
  async crearUno(@Body() bodyParams) {
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = bodyParams.nombre;
    usuarioCrearDto.apellido = bodyParams.apellido;
    usuarioCrearDto.fechaCreacion = bodyParams.fechaCreacion;
    try {
      //errores validacion
      const errores = await validate(usuarioCrearDto); //para validar validate
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien parametros');
      } else {
        return this.usuarioService.crearUno(usuarioCrearDto);
      }
    } catch (error) {
      //error de servidor
      console.error({ error: error, mensaje: 'Errores en crear usuario' });
      throw new InternalServerErrorException('Error servidor');
    }
  }
}

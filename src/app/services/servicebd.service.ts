import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from '../models/productos';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ServicealertService } from './servicealert.service';

@Injectable({
  providedIn: 'root'
})

export class ServicebdService {

  public database!: SQLiteObject;

  //creación de tablas:

  //1.
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY NOT NULL, nom_rol VARCHAR(20) NOT NULL)";

  //2.
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY autoincrement NOT NULL, nom_estado VARCHAR(20) NOT NULL)";

  //3.
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria(id_categoria INTEGER PRIMARY KEY NOT NULL, nomb_categoria VARCHAR(20) NOT NULL)";

  //tablas con fk

  //4.
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement NOT NULL, foto_perfil BLOB, pnombre VARCHAR(20) NOT NULL, apellido VARCHAR(30) NOT NULL, nom_usuario VARCHAR(30) NOT NULL, correo VARCHAR(40) NOT NULL, contrasena VARCHAR(16), id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol(id_rol))";

  //5.
  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cant_venta INTEGER, total INTEGER, id_usuario INTEGER, id_estado INTEGER,FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (id_estado) REFERENCES estado(id_estado))";

  //6.
  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY autoincrement NOT NULL, nombre_pr VARCHAR(30) NOT NULL, cantidad_kg INTEGER NOT NULL, precio INTEGER NOT NULL, stock INTEGER, foto BLOB NOT NULL, estatus VARCHAR(20) NOT NULL, id_categoria INTEGER, FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria))";

  //7.
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cantidad INTEGER, sub_total INTEGER, id_venta INTEGER, id_producto INTEGER, FOREIGN KEY (id_venta) REFERENCES venta(id_venta), FOREIGN KEY (id_producto) REFERENCES producto(id_producto))";

  //variables de insertar por defecto
  registroRolA: string = "INSERT or IGNORE INTO rol(id_rol, nom_rol) VALUES (1, 'Admin')";
  registroRolU: string = "INSERT or IGNORE INTO rol(id_rol, nom_rol) VALUES (2, 'Usuario')";

  registroEstadoTrue: string = "INSERT or IGNORE INTO estado(id_estado, nom_estado) VALUES (1, 'Completada')";
  registroEstadoFalse: string = "INSERT or IGNORE INTO estado(id_estado, nom_estado) VALUES (2, 'No completada')";

  registroCatFruta: string = "INSERT or IGNORE INTO categoria(id_categoria, nomb_categoria) VALUES (1, 'Frutas')"
  registroCatVerdura: string = "INSERT or IGNORE INTO categoria(id_categoria, nomb_categoria) VALUES (2, 'Verduras')"
  registroCatCarne: string = "INSERT or IGNORE INTO categoria(id_categoria, nomb_categoria) VALUES (3, 'Carnes')"
  registroCatLacteo: string = "INSERT or IGNORE INTO categoria(id_categoria, nomb_categoria) VALUES (4, 'Lácteos')"

  registroAdmin: string = "INSERT or IGNORE INTO usuario(id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (1, 'Angel', 'Llanos', 'kaifury', 'kaifury@monosql.cl', '12345678Angel@', 1)";

  registroAdmin2: string = "INSERT or IGNORE INTO usuario(id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (2, 'Rodrigo', 'Rocabado', 'pntrkllr', 'pntrkllr@monosql.cl', '1234Rodrigo@', 1)";

  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (3, 'Rodrigo', 'Guzmán', 'rodrigang', 'rodrigang@monosql.cl', 'Holacomoestan123@', 2)";

  registroUsuario2: string = "INSERT or IGNORE INTO usuario(id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (4, 'Roberto', 'Leiva', 'robertson', 'robertson@monosql.cl', 'mellamorobertoxd123@', 2)";

  registroProductoFruta: string = "INSERT or IGNORE INTO producto(id_producto, nombre_pr, cantidad_kg, precio, stock, foto, estatus, id_categoria) VALUES (1, 'Manzana Verde', 1, 2390, 10, '../assets/Productos/manzana-verde.png', 'Disponible', 1)";

  //variable observable
  listaProductos = new BehaviorSubject([]);
  listaCarrito = new BehaviorSubject([]);

  //variable observable para estatus de bd
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private usuarioBD = new BehaviorSubject<User | null>(null);

  constructor(private router: Router, private sqlite: SQLite, private platform: Platform, private alert: ServicealertService) {
    this.crearBD()
  }

  crearBD() {
    //verificar si la plataforma está lista
    this.platform.ready().then(() => {
      //crear la base de datos
      this.sqlite.create({
        name: 'bdTienda.db',
        location: 'default'
      }).then((bd: SQLiteObject) => {
        //guardar la conexion a la base de datos
        this.database = bd;
        //llamar a la creación de las tablas

        this.crearTablas();
        this.getProductos();

        //modificar el estado de la base de datos
        this.isDBReady.next(true);
      }).catch(e => {
        this.alert.presentAlert('CrearBD', 'Error: ' + JSON.stringify(e));
      })
    })

  }

  async crearTablas() {

    try {
      //ejecuto la creación de tablas en orden
      //no fk
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaEstado, []);
      await this.database.executeSql(this.tablaCategoria, []);

      //usuario
      await this.database.executeSql(this.tablaUsuario, []);

      //venta y detalle
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetalle, []);

      //producto
      await this.database.executeSql(this.tablaProducto, []);


      //ejecuto los insert en caso que existan
      //estado de producto
      await this.database.executeSql(this.registroEstadoTrue, []);
      await this.database.executeSql(this.registroEstadoFalse, []);

      //roles
      await this.database.executeSql(this.registroRolA, []);
      await this.database.executeSql(this.registroRolU, []);

      //usuarios admin y normales
      await this.database.executeSql(this.registroAdmin, []);
      await this.database.executeSql(this.registroAdmin2, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroUsuario2, []);

      //categorias
      await this.database.executeSql(this.registroCatFruta, []);
      await this.database.executeSql(this.registroCatVerdura, []);
      await this.database.executeSql(this.registroCatLacteo, []);
      await this.database.executeSql(this.registroCatCarne, []);

      //producto (fruta)
      await this.database.executeSql(this.registroProductoFruta, []);

    } catch (e) {
      this.alert.presentAlert('CrearTabla', 'Error: ' + JSON.stringify(e));
    }

  }

  fetchProductos(): Observable<Productos[]> {
    return this.listaProductos.asObservable();
  }

  fetchCarrito(): Observable<any[]> {
    return this.listaCarrito.asObservable();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  getUsuario(nom_usuario: string, contrasena: string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE nom_usuario = ? AND contrasena = ?', [nom_usuario, contrasena]).then(res => {
      let items: any[] = [];

      if (res.rows.length > 0) {
        const usuario = res.rows.item(0)

        localStorage.setItem('id_usuario', usuario.id_usuario)
        const idstring = localStorage.getItem('id_usuario')

        const idpaver = Number(idstring)
        // this.presentAlert('id en el local storage ', ' : '+ idpaver)

        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            pnombre: res.rows.item(i).pnombre,
            apellido: res.rows.item(i).apellido,
            nom_usuario: res.rows.item(i).nom_usuario,
            correo: res.rows.item(i).correo,
            contrasena: res.rows.item(i).contrasena,
            id_rol: res.rows.item(i).id_rol
          });
        }
      }
      return items.length > 0 ? items[0] : null;
    }).catch(e => {
      return this.alert.presentAlert('Error usuario', 'Error : ' + JSON.stringify(e));
    });
  }

  getUserPerfil(id: number) {
    return this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?;', [id])
      .then(res => {

        if (res.rows.length > 0) {

          const user: User = new User(
            res.rows.item(0).id_usuario,
            res.rows.item(0).pnombre,
            res.rows.item(0).apellido,
            res.rows.item(0).nom_usuario,
            res.rows.item(0).correo,
            res.rows.item(0).id_rol,
            res.rows.item(0).foto_perfil
          );
          this.usuarioBD.next(user);

        }
      })
  }


  fetchUsuario(): Observable<User | null> {
    return this.usuarioBD.asObservable();

  }

  logoutUsuario() {
    localStorage.removeItem('id_rol');
    localStorage.removeItem('nom_usuario');
  }

  getProductos() {
    return this.database.executeSql('SELECT * FROM producto', []).then(res => {
      //variable para almacenar el resultado del select
      let items: Productos[] = [];
      //verificar si el select trae mas de 1 registro
      if (res.rows.length > 0) {
        //recorremos el resultado de la consulta
        for (var i = 0; i < res.rows.length; i++) {
          //ingresar registro a registro en mi variable
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre_pr: res.rows.item(i).nombre_pr,
            cantidad_kg: res.rows.item(i).cantidad_kg,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            foto: res.rows.item(i).foto,
            estatus: res.rows.item(i).estatus,
            id_categoria: res.rows.item(i).id_categoria
          })

        }
      }
      this.listaProductos.next(items as any);
    })
  }

  //productos
  insertarProducto(nombre_pr: string, cantidad_kg: number, precio: number, stock: number, foto: Blob, estatus: string, id_categoria: number) {
    return this.database.executeSql('INSERT INTO producto(nombre_pr, cantidad_kg, precio, stock, foto, estatus, id_categoria) VALUES (?,?,?,?,?,?,?)', [nombre_pr, cantidad_kg, precio, stock, foto, estatus, id_categoria]).then((res) => {
      this.router.navigate(['/productos']);
      this.alert.presentAlert("Agregar", "Producto agregado correctamente");
      this.getProductos();
    }).catch(e => {
      this.alert.presentAlert('Agregar', 'Error: ' + JSON.stringify(e));
    })
  }

  editarProducto(id_producto: number, nombre_pr: string, cantidad_kg: number, precio: number, stock: number, foto: Blob, estatus: string, id_categoria: number) {
    return this.database.executeSql('UPDATE producto SET nombre_pr = ?, cantidad_kg = ?, precio = ?, stock = ?, foto = ?, estatus = ?, id_categoria = ? WHERE id_producto = ?', [nombre_pr, cantidad_kg, precio, stock, foto, estatus, id_categoria, id_producto]).then((res) => {
      this.router.navigate(['/productos']);
      this.alert.presentAlert("Modificar", "Producto modificado de manera correcta");
      this.getProductos();
    }).catch(e => {
      this.alert.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })
  }

  eliminarProducto(id_producto: string) {
    return this.database.executeSql('DELETE FROM producto WHERE id_producto = ?', [id_producto]).then((res) => {
      this.alert.presentAlert("Eliminar", "Producto eliminado de manera correcta");
      this.getProductos();
    }).catch(e => {
      this.alert.presentAlert('Eliminar', 'Error : ' + JSON.stringify(e));
    })
  }


  //usuarios
  insertarUsuario(foto_perfil: Blob, pnombre: string, apellido: string, nom_usuario: string, correo: string, contrasena: string, id_rol: number) {
    return this.database.executeSql('INSERT INTO usuario(foto_perfil, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (?,?,?,?,?,?,?)', [foto_perfil, pnombre, apellido, nom_usuario, correo, contrasena, id_rol]).then((res) => {
      this.router.navigate(['/login']);
      this.alert.presentAlert("Todo listo!", "Inicia sesión en Supermonkey.");
      const iduser = Number(localStorage.getItem('id_usuario'))
      this.getUserPerfil(iduser);
    }).catch(e => {
      this.alert.presentAlert('Registro', 'Error: ' + JSON.stringify(e));
    })
  }

  editarUsuario(id_usuario: number, pnombre: string, apellido: string, correo: string, foto_perfil?: Blob | null) {

    let query = 'UPDATE usuario SET pnombre = ?, apellido = ?, correo = ?';
    let params: (string | Blob | number)[] = [pnombre, apellido, correo];

    //si el usuario elige una foto de perfil se ejecuta esto
    if (foto_perfil) {
      query += ', foto_perfil = ?';  //campo de la foto
      params.push(foto_perfil);
    }

    query += ' WHERE id_usuario = ?';
    params.push(id_usuario);

    // Ejecutamos la consulta SQL con los parámetros
    return this.database.executeSql(query, params).then((res) => {
      this.alert.presentAlert("Modificar datos", "Datos modificados de manera correcta");
      this.getUserPerfil(id_usuario);
    }).catch(e => {
      this.alert.presentAlert('Modificar datos', 'Error: ' + JSON.stringify(e));
    });
  }

  carrito(id_usuario: Number, id_producto: number) {
    return this.database.executeSql("SELECT * FROM venta WHERE id_usuario = ? AND id_estado = 2", [id_usuario])
      .then((res) => {

        let id_venta: number;

        if (res.rows.length > 0) {
          id_venta = res.rows.item(0).id_venta
        }
        else {
          return this.database.executeSql("INSERT INTO venta (id_usuario, total, id_estado) VALUES (?, 0, 2);", [id_usuario])
            .then((res) => {
              id_venta = res.insertId;
            });
        }

        return this.database.executeSql(
          "SELECT * FROM detalle join venta WHERE id_usuario = ?",
          [id_usuario]
        ).then((res) => {
          let cantidad: number = 1;
          let productoYaEnCarrito = false;

          for (let i = 0; i < res.rows.length; i++) {
            if (res.rows.item(i).id_producto === id_producto) {
              productoYaEnCarrito = true;
              return;

            }
          }

          if (productoYaEnCarrito) {
            return this.alert.presentAlert('Carro', 'El producto ya se añadió al carrito');
          }
          else {
            return this.database.executeSql(
              `INSERT INTO detalle(id_venta, id_producto, sub_total, cantidad)
              VALUES (?, ?, (SELECT precio FROM producto WHERE id_producto = ?), ?)`,
              [id_venta, id_producto, id_producto, cantidad]
            ).then(() => {
              this.router.navigate(['/carrito']);
              this.alert.presentAlert('Carro', 'Producto añadido!');
              const id_usuario = Number(localStorage.getItem('id_usuario'))
              this.verCarrito(id_usuario)
            }).catch((error) => {
              return this.alert.presentAlert('Error Detalle', 'Error : ' + JSON.stringify(error));
            });
          }
        })
          .catch((error) => {
            // Manejar errores en la consulta inicial
            this.alert.presentAlert('Error al consultar la BD', ': ' + JSON.stringify(error));
          });

      }).catch((error) => {
        return this.alert.presentAlert('error select venta', ': ' + JSON.stringify(error))
      })
  }

  verCarrito(id_usuario: number) {
    return this.database.executeSql("SELECT producto.*, detalle.sub_total AS subtotal, detalle.cantidad AS cantidad FROM producto JOIN detalle ON detalle.id_producto = producto.id_producto JOIN venta ON venta.id_venta = detalle.id_venta WHERE venta.id_usuario = ? AND venta.id_estado = 2", [id_usuario]).then(res => {
      //variable para almacenar el resultado del select
      let items: any[] = [];
      //verificar si el select trae mas de 1 registro
      if (res.rows.length > 0) {
        //recorremos el resultado de la consulta
        for (var i = 0; i < res.rows.length; i++) {
          //ingresar registro a registro en mi variable
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre_pr: res.rows.item(i).nombre_pr,
            cantidad_kg: res.rows.item(i).cantidad_kg,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            foto: res.rows.item(i).foto,
            estatus: res.rows.item(i).estatus,
            id_categoria: res.rows.item(i).id_categoria,
            subtotal: res.rows.item(i).subtotal,
            cantidad: res.rows.item(i).cantidad,
            id_estado: res.rows.item(i).id_estado
          })
        }
      }
      this.listaCarrito.next(items as any);
    }).catch(e => {
      return this.alert.presentAlert('Error mostrar Carrito', 'Error : ' + JSON.stringify(e));

    });
  }

  masProducto(id_producto: number) {
    // Obtener el precio del producto
    return this.database.executeSql(
      `SELECT producto.*, detalle.sub_total AS subtotal, detalle.cantidad AS cantidad
      FROM producto 
      JOIN detalle ON detalle.id_producto = producto.id_producto 
      JOIN venta ON venta.id_venta = detalle.id_venta
      WHERE producto.id_producto = ? AND venta.id_estado = 2`,
      [id_producto]
    ).then((res) => {
      if (res.rows.length > 0) {
        const cantidadActual = res.rows.item(0).cantidad
        const precioActual = res.rows.item(0).precio;
        const nuevaCantidad = cantidadActual + 1;
        const nuevoSubtotal = nuevaCantidad * precioActual;

        // Actualizar la cantidad y el subtotal en la tabla detalle
        return this.database.executeSql(
          'UPDATE detalle SET cantidad = ?, sub_total = ? WHERE id_producto = ?',
          [nuevaCantidad, nuevoSubtotal, id_producto]
        ).then(() => {
          this.alert.presentAlert('Carro', 'Cantidad actualizada correctamente!');
          const id_usuario = Number(localStorage.getItem('id_usuario'))
          this.verCarrito(id_usuario)
        }).catch((error) => {
          return this.alert.presentAlert('Error cantidad', 'Error : ' + JSON.stringify(error));
        });
      } else {
        return this.alert.presentAlert('Error', 'Producto no encontrado.');
      }
    }).catch((error) => {
      return this.alert.presentAlert('Error al consultar precio', 'Error : ' + JSON.stringify(error));
    });
  }

  menosProducto(id_producto: number) {
    // Obtener el precio del producto
    return this.database.executeSql(
      `SELECT producto.*, detalle.sub_total AS subtotal, detalle.cantidad AS cantidad
      FROM producto 
      JOIN detalle ON detalle.id_producto = producto.id_producto 
      JOIN venta ON venta.id_venta = detalle.id_venta
      WHERE producto.id_producto = ? AND venta.id_estado = 2`,
      [id_producto]
    ).then((res) => {
      if (res.rows.length > 0) {
        const cantidadActual = res.rows.item(0).cantidad
        const precioActual = res.rows.item(0).precio;
        const nuevaCantidad = cantidadActual - 1;
        const nuevoSubtotal = nuevaCantidad * precioActual;

        // Actualizar la cantidad y el subtotal en la tabla detalle
        return this.database.executeSql(
          'UPDATE detalle SET cantidad = ?, sub_total = ? WHERE id_producto = ?',
          [nuevaCantidad, nuevoSubtotal, id_producto]
        ).then(() => {
          this.alert.presentAlert('Carro', 'Cantidad actualizada correctamente!');
          const id_usuario = Number(localStorage.getItem('id_usuario'))
          this.verCarrito(id_usuario)
        }).catch((error) => {
          return this.alert.presentAlert('Error cantidad', 'Error : ' + JSON.stringify(error));
        });
      } else {
        return this.alert.presentAlert('Error', 'Producto no encontrado.');
      }
    }).catch((error) => {
      return this.alert.presentAlert('Error al consultar precio', 'Error : ' + JSON.stringify(error));
    });
  }
  eliminarPcarrito(id_producto: number) {
    return this.database.executeSql('DELETE FROM detalle WHERE id_producto= ?', [id_producto]).then((res) => {
      this.alert.presentAlert("Eliminar", "Producto eliminado del carrito");
      const id_usuario = Number(localStorage.getItem('id_usuario'))
      this.verCarrito(id_usuario)
    }).catch(e => {
      this.alert.presentAlert('Eliminar', 'Error : ' + JSON.stringify(e));
    })

  }

  // verHistorial(id_usuario) {
  //   return 

  // }

  verUsuarios() {

  }
}

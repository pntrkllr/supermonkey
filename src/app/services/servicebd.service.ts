import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ServicebdService {

  //variables de insertar por defecto
  registroRol: string = "INSERT or IGNORE INTO rol (id_rol, nom_rol) VALUES (1, Admin)";

  public database!: SQLiteObject;

  //creación de tablas:

  //1.
  rol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom_rol VARCHAR(20) NOT NULL)";

  //2.
  estado: string = "CREATE TABLE IF NOT EXISTS estado (id_estado INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom_estado VARCHAR(20) NOT NULL)";

  //3.
  categoria: string = "CREATE TABLE IF NOT EXISTS categoria (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nomb_categoria VARCHAR(20) NOT NULL)";

  //tablas con fk

  //4.
  usuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, foto_perfil BLOB, pnombre VARCHAR(20) NOT NULL, apellido VARCHAR(30) NOT NULL, nom_usuario VARCHAR(30) NOT NULL, correo VARCHAR(40) NOT NULL, contrasena VARCHAR(16), id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol(id_rol))";

  //5.
  venta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cant_venta INTEGER, total INTEGER, id_usuario INTEGER, id_estado INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (id_estado) REFERENCES estado(id_estado)))";

  //6.
  producto: string = "CREATE TABLE IF NOT EXISTS producto (id_producto INTEGER PRIMERY KEY AUTOINCREMENT NOT NULL, nombre_pr VARCHAR(30) NOT NULL, cantidad_kg INTEGER NOT NULL, precio INTEGER NOT NULL, stock INTEGER, foto BLOB NOT NULL, estatus BOOLEAN NOT NULL, id_categoria INTEGER, FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria))";

  //7.
  detalle: string = "CREATE TABLE IF NOT EXISTS detalle (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cantidad INTEGER, sub_total INTEGER, id_venta INTEGER, id_producto INTEGER, FOREIGN KEY (id_venta) REFERENCES venta(id_venta), FOREIGN KEY (id_producto) REFERENCES producto(id_producto)))";

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { }
}

export class User {

    constructor(
        public id_usuario: number,
        public pnombre: string,
        public apellido: string,
        public nom_usuario : string,
        public correo : string,
        public id_rol : string,
        public foto? : any 
    ){

    }
}

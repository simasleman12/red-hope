export class RegistratioModel {
    constructor(
        public fullname: string, 
        public phone: string, 
        public email: string,
         public password: string, 
         public password_confirmation: string) { }
}
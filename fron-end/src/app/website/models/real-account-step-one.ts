export class RealAccountModel {
    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public password_confirmation: string,
        public country_id: string,
    ) { }
}
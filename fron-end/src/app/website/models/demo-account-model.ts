export class DemoAccountModel {
    constructor(public first_name: string,
        public last_name: string,
        public phone: string,
        public email: string,
        public password: string,
        public password_confirmation: string,
        public country_id: string,
        public currency_id: string,
        public type: string,
        public platform: string,
        public leverage: number,
        public investment: number,
        public account_type: number,
    ) { }
}
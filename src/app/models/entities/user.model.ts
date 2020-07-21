
export class UserModel {

    entityId:number;
    address: string;
    businessName: string;
    country: string;
    creationUser: string;
    delivery: string;
    departament: string;
    district: string;
    cardNumber:number = 1234567890987654;
    cardOperator:string ="Prueba"
    dni: string;
    ruc: string;
    email: string;
    establishmentType: string;
    lastNameMaternal: string;
    lastNamePaternal: string
    latitude: number;
    longitude: number;
    name: number;
    operationSchedule: number[];
    password: string;
    phoneNumber: string;
    province: string;
    shippingSchedule: number[];
    urbanization: string
    userType: string = 'C'
    updateUser : number
    constructor(){}



}
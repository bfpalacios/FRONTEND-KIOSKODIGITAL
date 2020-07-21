

export class StoreModel {

    id: number;
    latitud: number;
    longitud: number;
    storeType: number;
    pathicon: string;
    name: string;
    owner: string;
    delivery: string;
    phone: string;
    address: string;
    pathphoto: string;
    operationSchedule: any[];
    shippingSchedule: any[];


    constructor(
        id: number,
        latitud: number,
        longitud: number,
        storeType: number,
        name: string,
        owner: string,
        delivery: string,
        phone: string,
        address: string,
        pathphoto: string,
        operationSchedule: any[],
        shippingSchedule: any[]
    ) {

        this.id = id;
        this.latitud = latitud;
        this.longitud = longitud;
        this.storeType = storeType;
        this.pathicon = storeType != 1 ? './assets/img/markers/tiendas.png' : './assets/img/markers/puesto.png';
        this.name = name;
        this.owner = owner;
        this.delivery = delivery == 'S' ? 'SI, por horario' :'NO, solo recojo en tienda.';
        this.phone = phone;
        this.address = address;
        this.pathphoto = pathphoto == null ? './assets/img/img_not_found.jpg' : pathphoto;
        this.operationSchedule = operationSchedule;
        this.shippingSchedule = shippingSchedule;


    }



}




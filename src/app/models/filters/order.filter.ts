import * as moment from 'moment';

export class OrderFilters {

    clientName: string;
    clientDni: string;
    orderStartDate: string;
    orderEndDate: string;
    status: string = 'I';
    page: number = 0;
    size:number = 30;
    sortBy:string = '-creationDate'
}


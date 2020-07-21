import * as moment from 'moment';

export class OrderFilters {

    clientName: string;
    clientDni: string;
    orderStartDate: string = moment().subtract(30, 'day').format('YYYY-MM-DD');
    orderEndDate: string = moment().add(1, 'day').format('YYYY-MM-DD');
    status: string = 'I';
    page: number = 0;
    size:number = 30;
    sortBy:string = '-creationDate'
    
}


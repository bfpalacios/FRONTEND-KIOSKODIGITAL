import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(errors: any[], key: string): string {
    let messages:any[] = errors.filter(item => item['field-name'] == key) 
    let message = messages.map((item:any)=>{return item.message}).join(', ');
    return message;
  }

}

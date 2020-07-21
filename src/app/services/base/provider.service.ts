import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  getQuery(api: string, params: any = null) {
    const url = `${environment.API_URL}${api}`
    return this.http.get(url, { 'params': params });
  }
  post(api: string, object: any) {
    const url = `${environment.API_URL}${api}`

    return this.http.post(url, object);
  }

  put(api: string, body: any) {
    const url = `${environment.API_URL}${api}`
    return this.http.put(url, body);

  }

  upLoadFile(api: string, file: File) {
    const url = `${environment.API_URL}${api}`
    let formData = new FormData();
    formData.append('file', file);
    return this.http.put(url, formData);
  }


}

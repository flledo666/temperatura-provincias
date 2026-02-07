import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class HttpService {

  constructor(private http:HttpClient) {}

  getTemperaturas(codigo:string)
  {
    return this.http.get("https://api.el-tiempo.net/json/v3/provincias/"+ codigo.substring(0,2) + "/municipios/" + codigo);
  }
}

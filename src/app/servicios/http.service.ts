import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class HttpService {

  constructor(private http:HttpClient) {}

  getHttp(codigo:string)
  {
    return this.http.get("https://www.el-tiempo.net/api/json/v2/provincias/"+ codigo);
  }
}
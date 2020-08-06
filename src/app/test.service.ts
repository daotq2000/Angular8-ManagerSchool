import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from "./test";
const schoolAPI = "http://localhost:8080/organisation/getAll";

@Injectable({
  providedIn: 'root'
})

export class TestService {

  constructor( private http:HttpClient) { }
  getList(): Observable<Array<Test>>{
    return this.http.get<any>(schoolAPI);
};
}

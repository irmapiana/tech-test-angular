//import this to make http requests
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
//we've defined our base url here in the env
import {environment} from "../../environments/environment";
import { Employee } from "@app/_models/employee";
import { Injectable } from "@angular/core";
// ....
//class apiService
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  /**
   * This method returns students details
   */
  getAllEmployee(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`http://localhost:3000/employee`);
  }

  create(payload: Employee){
    return this.httpClient.post<Employee>(`http://localhost:3000/employee`, payload)
  }

  find(id:number): Observable<Employee>{
    return this.httpClient.get<Employee>(`http://localhost:3000/employee/${id}`)
  }
}
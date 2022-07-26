import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) { }

  postColaborador(data : any){
    return this.http.post<any>("http://localhost:3000/colaboradorList/", data);
  }

  getColaborador(){
    return this.http.get<any>("http://localhost:3000/colaboradorList/");
  }

  putColaborador(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/colaboradorList/"+id, data);
  }
  deleteColaborador(id:number){
    return this.http.delete<any>("http://localhost:3000/colaboradorList/"+id);
  }
}

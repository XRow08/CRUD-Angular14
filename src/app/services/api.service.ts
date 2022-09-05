import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) { }

  postColaborador(data : any){
    return this.http.post<any>("https://angular-14-crud.herokuapp.com/colaboradorList/", data);
  }

  getColaborador(){
    return this.http.get<any>("https://angular-14-crud.herokuapp.com/colaboradorList/");
  }

  putColaborador(data:any,id : number){
    return this.http.put<any>("https://angular-14-crud.herokuapp.com/colaboradorList/"+id, data);
  }
  deleteColaborador(id:number){
    return this.http.delete<any>("https://angular-14-crud.herokuapp.com/colaboradorList/"+id);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud';
  displayedColumns: string[] = ['colaboradorNome', 'category', 'data', 'salario', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog :  MatDialog, private api : ApiService){
  }
  ngOnInit(): void {
    this.getAllColaborador();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllColaborador();
      }
    })
  }

  getAllColaborador(){
    this.api.getColaborador()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Erro no cadastro do colaborador");
      }
    })
  }

  editColaborador(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%,',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllColaborador();
      }
    })
  }

  deleteColaborador(id : number){
    this.api.deleteColaborador(id)
    .subscribe({
      next:(res)=>{
        alert("Colaborador excluído com sucesso!")
        this.getAllColaborador();
      },
      error:()=>{
        alert("Erro ao excluir o colaborador.")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

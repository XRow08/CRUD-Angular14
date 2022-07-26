import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from './../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  colaboradorForm!: FormGroup;
  actionBtn : string = "save"

  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.colaboradorForm = this.formBuilder.group({
      colaboradorNome : ['', Validators.required],
      category : ['', Validators.required],
      data : ['', Validators.required],
      salario : ['', Validators.required],
      description : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Editar";
      this.colaboradorForm.controls['colaboradorNome'].setValue(this.editData.colaboradorNome);
      this.colaboradorForm.controls['category'].setValue(this.editData.category);
      this.colaboradorForm.controls['data'].setValue(this.editData.data);
      this.colaboradorForm.controls['salario'].setValue(this.editData.salario);
      this.colaboradorForm.controls['description'].setValue(this.editData.description);
    }
  }

  addColaborador(){
    if(!this.editData){
      if(this.colaboradorForm.value){
        this.api.postColaborador(this.colaboradorForm.value)
        .subscribe({
          next: (res)=>{
            alert("Colaborador adicionado com sucesso!");
            this.colaboradorForm.reset();
            this.dialogRef.close('save');
          },
          error: ()=>{
            alert("Erro no cadastro do colaborador")
          }
        })
      }
    } else{
      this.updateColaborador()
    }
  }
  updateColaborador(){
    this.api.putColaborador(this.colaboradorForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Dados do colaborador editado com sucesso!");
        this.colaboradorForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Erro ao editar os dados do Colaborador!");
      }
    })
  }
}

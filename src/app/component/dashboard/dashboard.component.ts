import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private CrudService : CrudService){

  }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.CrudService.getAllTask().subscribe(res =>{
      this.taskArr = res;
      }, err =>{
        alert("Não foi possível acessar a lista de tarefas")
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.CrudService.addTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
      this.addTaskValue = '';
    },err =>{
      alert(err);
    }
    )
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.CrudService.editTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
    },err=>{
      alert("Falha ao atualizar a tarefa")
    })
  }

  deleteTask(etask: Task){
    this.CrudService.deleteTask(etask).subscribe(res =>{
      this.ngOnInit();
    },err=>{
      alert("Falha ao deletar a tarefa")
    });
  }

  call(etask: Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}

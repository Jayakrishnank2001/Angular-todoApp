import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from '../class/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
   todoValue:string=''
   todoList:Todo[]=[]
   finishedList:Todo[]=[]

   constructor(private modalService:NgbModal){}

   changeTodo(i:number){
     const item=this.todoList.splice(i,1)
     this.finishedList.push(item[0])
   }

   addTodo(){
    if (this.todoValue.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Cannot add an empty todo!',
      });
    }else if(this.todoList.some(todo => todo.content.toLowerCase() === this.todoValue.trim().toLowerCase())){
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Entry',
        text: 'Todo already exists!',
      });
    }else{
      this.todoList.push({content:this.todoValue,value:false})
      this.todoValue=''
    }
   }
   changeFinished(i:number){
    const item=this.finishedList.splice(i,1)
    this.todoList.push(item[0])
   }

   openModal(content:TemplateRef<Element>,i:number,type:String){
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then(
      (result)=>{
        if(type == 'todoList'){
          this.todoList.splice(i,1)
        }else{
          this.finishedList.splice(i,1)
        }
      },
      (reason)=>{

      }
    )
   }

   editTodo(i:number){
    
   }
}

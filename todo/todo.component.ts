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
   editedTodo:string=''
   editedIndex:number=0
   modalRef: any;


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
    }else if(this.todoList.some(todo => todo.content.toLowerCase() === this.todoValue.trim().toLowerCase()) || this.finishedList.some(todo => todo.content.toLowerCase() === this.todoValue.trim().toLowerCase())){
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

   openModal(reference:TemplateRef<Element>,i:number,type:String){
    this.modalService.open(reference,{ariaLabelledBy:'modal-basic-title'}).result.then(
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

   openEditModal(editModal:TemplateRef<Element>,i:number,type:string){
      this.editedTodo= this.todoList[i].content;
      this.editedIndex=i
      this.modalRef = this.modalService.open(editModal, { ariaLabelledBy: 'modal-basic-title' });
      this.modalRef.componentInstance.editedTodo = this.editedTodo;    
    }

    onInputChange(event: any) {
      this.editedTodo = event.target.value;
      this.modalRef.componentInstance.editedTodo = this.editedTodo;
    }

    editTodo() {
      this.todoList[this.editedIndex].content = this.editedTodo;
      this.modalRef.close();
    }

}

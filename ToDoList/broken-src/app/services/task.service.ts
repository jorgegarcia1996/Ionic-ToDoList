import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[];

  constructor(private storage : Storage) {
    this.storage.get('tasks').then(
      data => this.tasks = (data != null ? data:[])
    );
  }

  
  getTasks() : Task[] {
    return this.tasks;
  }

  getTaskById(id: number) : Task {
    return this.tasks.filter(t => t.id == id)[0];
  }

  saveTask(t: Task) {
    (t.id != undefined) ? this.addTask(t) : this.editTask(t);
    this.storage.set('tasks', this.tasks);
  }

  editTask(t: Task) {
    const index=this.tasks.findIndex(tAux => tAux.id==t.id);
    this.tasks[index].title=t.title;
    this.tasks[index].description=t.description;
  }

  addTask(t: Task) {
    let newId = 0;
    if(this.tasks.length > 0) {
      newId = this.tasks[this.tasks.length - 1].id + 1;

    }

    const taskToSave = {
      id: newId,
      title: t.title,
      description: t.description
    };

    this.tasks.push(taskToSave);
  }
  
  deleteTask(id:number) {
    //ejemplo de un filtro para un array
    this.tasks = this.tasks.filter(t => t.id != id);
  }
}

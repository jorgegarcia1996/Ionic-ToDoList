import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  task: Task = {
    title: '',
    description: ''
  };

  //Inyeccion del servicio
  constructor(private taskService: TaskService, private router: Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    (id != null) ? this.task = this.taskService.getTaskById(+id): '';
  }
  //Método que se llama al pulsar el botón, el cual utiliza un método del servicio inyectado
  //Utilizando la clase router volvemos al home al guardar
  saveTask() {
    this.taskService.saveTask(this.task);
    this.router.navigateByUrl('/home');
  }

}

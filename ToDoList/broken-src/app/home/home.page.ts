import { Component } from '@angular/core';
import { Task } from '../model/task';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: Task[];

  constructor(private taskService: TaskService, private router: Router,
              private alertController: AlertController) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  goEdit(id: number) {
    //if ternario o de una linea
    this.router.navigateByUrl(`/edit${ id != undefined ? '/' + id : ''}`);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  //Alert par confirmación al borrar una tarea
  async alertDelete(id: number, title: string) {
    const alert = await this.alertController.create({
      header: 'Borrar Tarea',
      message: `La siguiente tarea va a ser eliminada.<br><strong>${title}</strong>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, 
        {
          text: 'Borrar',
          handler: () => {
            this.deleteTask(id);
          }
        }
      ]
    });

    await alert.present();
  }
}

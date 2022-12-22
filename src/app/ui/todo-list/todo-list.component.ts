import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToDoModel } from 'src/app/models/todo-model';
import { CustomHttpServiceService } from 'src/app/services/custom-http-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(
    private customHttpClient: CustomHttpServiceService
  ) { }

  datas: any;
  setData: ToDoModel;
  public todoTitle: string
  // dataLoaded: boolean = false

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.customHttpClient.get<ToDoModel>().subscribe((response) => {
      this.datas = response;
      console.log(this.datas);
    }, (errorResponse: HttpErrorResponse) => {
      console.log(`${errorResponse.status} - ${errorResponse.message}`);
    });
  }

  addToDo() {
    this.customHttpClient.post<ToDoModel>(this.datas).subscribe((response) => {
      console.log("Başarılı");
    }, (errorResponse: HttpErrorResponse) => {
      console.log(`${errorResponse.status} - ${errorResponse.message}`);
    })
  }

  add(check?: boolean) {
    this.setData = {
      id: this.datas.id + 1,
      todoBool: check || false,
      todoTitle: this.todoTitle
    };

    this.customHttpClient.post<ToDoModel>(this.setData).subscribe((response) => {
      console.log(response);
      this.getAll();
    }, (errorResponse: HttpErrorResponse) => {
      console.log(`${errorResponse.status} - ${errorResponse.message}`);
    });
  }

  patch(data: ToDoModel) {
    this.customHttpClient.patch<ToDoModel>(data.id, data).subscribe((respone) => {
      console.log(respone);
      this.getAll();
    }, (errorResponse: HttpErrorResponse) => {
      console.log(`${errorResponse.status} - ${errorResponse.message}`);
    });
  }

  delete(id: number) {
    this.customHttpClient.delete(id).subscribe((response) => {
      console.log(response);
      this.getAll();
    }, (errorResponse: HttpErrorResponse) => {
      console.log(`${errorResponse.status} - ${errorResponse.message}`);
    });
  }

  check(data: ToDoModel) {
    if (data.todoBool == false) {
      data.todoBool = true;
      this.patch(data);
      console.log(data)
    }
    else {
      data.todoBool = false;
      this.patch(data);
      console.log(data);
    }
  }

  addClass(status: boolean) {
    if (status == true) {
      return 'text-decoration-line-through';
    }
    else {
      return '';
    }
  }

}

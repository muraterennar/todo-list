import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoModel } from '../models/todo-model';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }


  url: string = "http://localhost:3000/posts";

  get<T>() {
    return this.httpClient.get<T>(this.url);
  }

  post<T>(data: T) {
    return this.httpClient.post(this.url, data);
  }

  patch<T>(id:number,data: T) {
    let newUrl = `${this.url}/${id}`
    return this.httpClient.patch(newUrl, data);
  }

  delete<T>(id: number) {
    let newUrl = `${this.url}/${id}`
    return this.httpClient.delete(newUrl);
  }
}

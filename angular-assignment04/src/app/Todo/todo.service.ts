import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from './todo';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class TodoService {
  todoUrl = 'https://jsonplaceholder.typicode.com/todos'; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TodoService');
  }

  /** GET todos from the server */
  getTodo (): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl)
      .pipe(
        catchError(this.handleError('getTodos', []))
      );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo, httpOptions)
      .pipe(
        catchError(this.handleError('addTodo', todo))
      );
  }

  deleteTodo (name: string): Observable<{}> {
    const url = `${this.todoUrl}/${name}`; 
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteTodo'))
      );
  }
}
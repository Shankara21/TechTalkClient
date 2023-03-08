import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private url = 'http://localhost:3000/';
  // private production = 'http://192.168.9.47:3737/'
  constructor(private HttpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public id: any;
  public username: any;
  public fullname: any;
  public email: any;
  public userLevel: any;

  public data: any;
  //////////////////////
  //?/ Http Methods ///
  ////////////////////

  // Categories
  getCategories() {
    return this.HttpClient.get(this.url + 'categories')
      .pipe(catchError(this.errorHttpHandler))
  }
  showCategories(id: any) {
    return this.HttpClient.get(this.url + 'categories/' + id)
      .pipe(catchError(this.errorHttpHandler))
  }
  createCategory(params: any) {
    return this.HttpClient.post(this.url + `categories`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateCategory(id: any, params: any) {
    return this.HttpClient.put(this.url + `categories/${id}`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteCategory(id: any) {
    return this.HttpClient.delete(this.url + `categories/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Articles
  getArticles() {
    return this.HttpClient.get(this.url + 'articles')
      .pipe(catchError(this.errorHttpHandler))
  }
  showArticles(title: any) {
    return this.HttpClient.get(this.url + 'articles/' + title)
      .pipe(catchError(this.errorHttpHandler))
  }
  createArticle(params: any) {
    return this.HttpClient.post(this.url + `articles`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateArticle(id: any, params: any) {
    return this.HttpClient.put(this.url + `articles/${id}`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteArticle(id: any) {
    return this.HttpClient.delete(this.url + `articles/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  //////////////////////
  //!/ Http Methods ///
  ////////////////////

  // Error handling
  errorHttpHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error ${error.error.message}`
    }
    else {
      errorMessage = `Error code : ${error.status}\n${error.message}`
    }
    return throwError(errorMessage)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private url = 'http://localhost:3000/';
  private production = 'http://192.168.9.47:3125/'
  constructor(private HttpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


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
  filterCategory(name: any) {
    return this.HttpClient.get(this.url + `articles/filter/${name}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Auth
  login(params: any) {
    return this.HttpClient.post(this.url + 'users/login', params)
  }
  register(params: any) {
    return this.HttpClient.post(this.url + 'users/register', params)
  }
  logout(params: any) {
    return this.HttpClient.delete(this.url + `users/logout/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  refreshToken(params: any) {
    return this.HttpClient.post(this.url + `users/refreshToken`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // User
  getUser() {
    return this.HttpClient.get(this.url + 'users')
      .pipe(catchError(this.errorHttpHandler))
  }
  findUser(id: any) {
    return this.HttpClient.get(this.url + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteUser(id: any) {
    return this.HttpClient.delete(this.url + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateUser(id: any, params: any) {
    return this.HttpClient.put(this.url + `users/${id}`, params)
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

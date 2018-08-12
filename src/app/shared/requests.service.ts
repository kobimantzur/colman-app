import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from "../recipes/recipe.model";
const BASE_API = 'http://localhost:2000/';
// const BASE_API = 'https://colman-recipe.herokuapp.com/';
const GET_ALL_RECIPE_URL = BASE_API + 'recipe/getAll';
const ADD_RECIPE_URL = BASE_API + 'recipe/add';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
@Injectable()
export class RequestsService{
    constructor(private http: HttpClient) {
    }

/**
 * Perform an HTTP POST request where obj will
 * @param {object} obj 
 */
postRequest<T> (servicePath, bodyParams: T): Observable<T> {
    return this.http.post<T>(servicePath, bodyParams, httpOptions)
      .pipe(
        catchError(this.handleError(servicePath, bodyParams))
      );
}

/**
 * Perform an HTTP GET request where obj will
 * @param {object} obj 
 */
getRequest<T> (servicePath, requestParams): Observable<T> {
    const options = {
        params: new HttpParams()
    }
    Object.keys(requestParams || {}).forEach((prop) => {
        options.params.set(prop, requestParams[prop]);
    })
  
    return this.http.get<T>(servicePath, options)
      .pipe(
        catchError(this.handleError(servicePath, null))
      );
}

getAllRecipes(): Observable<Recipe[]> {
    return this.http.get(GET_ALL_RECIPE_URL)
    .pipe(
        catchError(this.handleError('getAllRecipes', null))
    )
}




  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation?: string, result?: T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;
      return of( result );
    };
  }
}
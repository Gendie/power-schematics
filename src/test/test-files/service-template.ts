import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { END_POINTS } from './globals';
import { ResultWithRanking, %{ #modelName }% } from 'src/app/shared/models';

const API_URL = END_POINTS.%{ #apiEndPoint }%;

@Injectable({
  providedIn: 'root'
})
export class %{ #serviceName }% {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<ResultWithRanking<%{ #modelName }%>> {
    return this.http.get<ResultWithRanking<%{ #modelName }%>>(API_URL + `/${id}`);
  }
  getAll(): Observable<%{ #modelName }%[]> {
    return this.http.get<%{ #modelName }%[]>(API_URL);
  }
  create(model: %{ #modelName }%): Observable<ResultWithRanking<Bank>> {
    return this.http.post<ResultWithRanking<%{ #modelName }%>>(API_URL, model);
  }
  update( id: number,model: %{ #modelName }%): Observable<ResultWithRanking<%{ #modelName }%>> {
    return this.http.put<ResultWithRanking<%{ #modelName }%>>(API_URL + `/${id}`, model);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + `/${id}`);
  }
  getNewId(): Observable<number> {
    const action = "/GetNewId";
    return this.http.get<number>(API_URL+action)
  }
  
  printReport(): Observable<any> {
    const action = "/ShowReport";
    return this.http.get<any>(API_URL+action)
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { END_POINTS } from './globals';
import { ResultWithRanking, Bank } from 'src/app/shared/models';

const API_URL = END_POINTS.banks;

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<ResultWithRanking<Bank>> {
    return this.http.get<ResultWithRanking<Bank>>(API_URL + `/${id}`);
  }
  getAll(): Observable<Bank[]> {
    return this.http.get<Bank[]>(API_URL);
  }
  create(model: Bank): Observable<ResultWithRanking<Bank>> {
    return this.http.post<ResultWithRanking<Bank>>(API_URL, model);
  }
  update( id: number,model: Bank): Observable<ResultWithRanking<Bank>> {
    return this.http.put<ResultWithRanking<Bank>>(API_URL + `/${id}`, model);
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
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Env } from '../env';
import { AnswersPagination, Answers } from '../../interfaces/answers';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  constructor(private http: HttpClient, private router: Router) {}
  private url = Env.apiUrl;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getAnswwers(
    id: string,
    page?: number,
    limit?: number
  ): Observable<AnswersPagination> {
    return this.http.get<AnswersPagination>(
      `${this.url}/api/answers/${id}?page=${page}&limit=${limit}`
    );
  }

  createAnswer(qid: string, body: Object): Observable<Answers> {
    return this.http.post<Answers>(`${this.url}/api/answers/${qid}`, body);
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Env } from '../env';
import { QuestionsPagination, Questions } from '../../interfaces/questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient, private router: Router) {}
  private url = Env.apiUrl;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getQuestions(
    page?: number,
    limit?: number,
    sortBy?: string
  ): Observable<QuestionsPagination> {
    return this.http.get<QuestionsPagination>(
      `${this.url}/api/questions?page=${page}&limit=${limit}&sort=${sortBy}`
    );
  }

  createQuestion(body: Object): Observable<Questions> {
    return this.http.post<Questions>(`${this.url}/api/questions`, body);
  }
}

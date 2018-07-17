import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issue } from '../models/issue';
const BASE_URL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private httpClient: HttpClient) { }
  getIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(`${BASE_URL}/issues`);
  }

  getAnIssue(id: string): Observable<Issue> {
    return this.httpClient.get<Issue>(`${BASE_URL}/issues/${id}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.httpClient.post<Issue>(`${BASE_URL}/issues`, issue);
  }

  findIssues(
    filter = '', sortOrder = 'asc', sortColumn = '',
    pageNumber = 0, pageSize = 3):  Observable<Issue[]> {
    return this.httpClient.get(`${BASE_URL}/issues`, {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('sortColumn', sortColumn)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
    }).pipe(
      map(res => {
        return res['results'];
      })
    );
  }
}

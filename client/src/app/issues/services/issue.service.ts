import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue, IssueWithDetails } from '../models/issue.class';
import { Observable } from 'rxjs';

@Injectable()
export class IssueService {

  private url: String = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.url}/issues`);
  }

  getIssuesWithDetails(): Observable<IssueWithDetails[]> {
    return this.http.get<IssueWithDetails[]>(`${this.url}/issues/details`);
  }

  getIssueById(id: String): Observable<Issue> {
    return this.http.get<Issue>(`${this.url}/issues/${id}`);
  }

  getIssueWithDetailsById(id: String): Observable<IssueWithDetails> {
    return this.http.get<IssueWithDetails>(`${this.url}/issues/${id}/details`);
  }

  addIssue(issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.url}/issues/add`, issue);
  }

  updateIssue(issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.url}/issues/update/${issue._id}`, issue);
  }

  deleteIssue(id: String) {
    return this.http.get(`${this.url}/issues/delete/${id}`);
  }
}

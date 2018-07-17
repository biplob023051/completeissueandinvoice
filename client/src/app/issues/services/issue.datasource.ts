import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Issue } from '../models/issue';
import { IssueService } from './issue.service';

export class IssueDataSource implements DataSource<Issue> {
  public issuesSubject = new BehaviorSubject<any>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private issueCountSubject = new BehaviorSubject<number>(0);
  public issueCount$ = this.issueCountSubject.asObservable();
  private pageSizeSubject = new BehaviorSubject<number>(0);
  public $pageSize = this.pageSizeSubject.asObservable();
  constructor(private issueService: IssueService) {}

  loadIssues(
    filter: string,
    sortDirection: string,
    sortColumn: string,
    pageIndex: number,
    pageSize: number) {
    this.loadingSubject.next(true);
    this.issueService.findIssues(filter, sortDirection, sortColumn, pageIndex, pageSize).pipe(
      catchError(() => of([])), // We can show error message here instead of empty array
      finalize(() => {
        this.loadingSubject.next(false);
      })
    )
    .subscribe(results => {
      this.issueCountSubject.next(results['total']);
      this.pageSizeSubject.next(results['limit']);
      this.issuesSubject.next(results['docs']);
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Issue[]> {
    console.log(collectionViewer);
    return this.issuesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.issuesSubject.complete();
    this.loadingSubject.complete();
    this.issueCountSubject.complete();
    this.pageSizeSubject.complete();
  }
}

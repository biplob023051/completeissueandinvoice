import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueViewModalComponent } from '../issue-view-modal/issue-view-modal.component';
import { ModalService } from '../../../shared/modal.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { IssueDataSource } from '../../services/issue.datasource';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-issue-listing',
  templateUrl: './issue-listing.component.html',
  styleUrls: ['./issue-listing.component.css']
})
export class IssueListingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  constructor(
    private issueService: IssueService,
    private router: Router,
    private modalService: ModalService,
    private snackbarService: SnackbarService
  ) { }
  displayedColumns: string[] = ['title', 'responsible', 'severity',
  'status', 'deadline', 'created', 'action'];
  dataSource: IssueDataSource;
  allIssues: IssueDataSource;
  totalCount = 0;
  pageSize = 0;
  ngOnInit() {
    this.dataSource = new IssueDataSource(this.issueService);
    this.dataSource.loadIssues('', 'asc', '', 0, 5);
    this.dataSource.issueCount$.subscribe(issueCount => {
      this.totalCount = issueCount;
    });
    this.dataSource.$pageSize.subscribe(pageSize => {
      this.pageSize = pageSize;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadIssuesPage();
        })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadIssuesPage())
      )
      .subscribe();

  }

  addIssue() {
    this.router.navigate(['dashboard', 'issues', 'new']);
  }

  editIssue(id) {
  }

  deleteIssue(id) {
  }

  viewIssue(id) {
    this.issueService.getAnIssue(id)
    .subscribe(issue => {
      this.modalService
      .invoke(IssueViewModalComponent,
      {
        width: '1200px',
        height: '600px',
        data: issue
      })
      .subscribe(result => console.log(result));
    }, error => this.snackbarService.errorMessage('Failed to load issue'));
  }

  loadIssuesPage() {
    this.dataSource.loadIssues(
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

}

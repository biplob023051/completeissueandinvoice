import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';
import { IssueViewModalComponent } from '../issue-view-modal/issue-view-modal.component';
import { ModalService } from '../../../shared/modal.service';
import { SnackbarService } from '../../../shared/snackbar.service';

@Component({
  selector: 'app-issue-listing',
  templateUrl: './issue-listing.component.html',
  styleUrls: ['./issue-listing.component.css']
})
export class IssueListingComponent implements OnInit {

  constructor(
    private issueService: IssueService,
    private router: Router,
    private modalService: ModalService,
    private snackbarService: SnackbarService
  ) { }
  displayedColumns: string[] = ['title', 'responsible', 'severity',
  'status', 'deadline', 'created', 'action'];
  dataSource: Issue[] = [];
  ngOnInit() {
    this.issueService.getIssues()
    .subscribe(issues => {
      this.dataSource = issues;
    }, error => this.snackbarService.errorMessage('Failed to load issues'));
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
        width: '800px',
        height: '500px',
        data: issue
      })
      .subscribe(result => console.log(result));
    }, error => this.snackbarService.errorMessage('Failed to load issue'));
  }

}

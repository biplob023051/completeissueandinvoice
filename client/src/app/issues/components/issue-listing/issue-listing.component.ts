import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { IssueViewModalComponent } from '../issue-view-modal/issue-view-modal.component';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-issue-listing',
  templateUrl: './issue-listing.component.html',
  styleUrls: ['./issue-listing.component.css']
})
export class IssueListingComponent implements OnInit {

  constructor(
    private issueService: IssueService,
    private router: Router,
    private modalService: ModalService
  ) { }
  displayedColumns: string[] = ['title', 'responsible', 'severity',
  'status', 'deadline', 'created', 'action'];
  dataSource: Issue[] = [];
  ngOnInit() {
    this.issueService.getIssues()
    .subscribe(issues => {
      this.dataSource = issues;
    }, error => {
      console.log(error);
    });
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
    }, err => {
      console.log(err);
    });
  }

}

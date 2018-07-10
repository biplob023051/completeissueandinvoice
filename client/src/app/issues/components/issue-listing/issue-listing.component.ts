import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-listing',
  templateUrl: './issue-listing.component.html',
  styleUrls: ['./issue-listing.component.css']
})
export class IssueListingComponent implements OnInit {

  constructor(
    private issueService: IssueService,
    private router: Router
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
  }

}

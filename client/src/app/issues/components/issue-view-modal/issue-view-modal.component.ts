import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-view-modal',
  templateUrl: './issue-view-modal.component.html',
  styleUrls: ['./issue-view-modal.component.css']
})
export class IssueViewModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public issue: Issue) { }
  displayedColumns = ['title', 'description'];
  dataSource = this.issue;
  ngOnInit() {
  }

}

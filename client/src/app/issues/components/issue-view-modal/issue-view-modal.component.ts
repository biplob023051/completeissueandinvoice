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
  viewIssue: Issue;
  photos = [];
  PHOTO_URL = 'http://localhost:3000/api/issues/photos/';
  ngOnInit() {
    this.viewIssue = this.issue;
    if (this.viewIssue.photos) {
      this.photos = JSON.parse(this.viewIssue.photos);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { Router } from '@angular/router';

import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
const URL = 'http://localhost:3000/api/issues/photos';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {
  uploader: FileUploader = new FileUploader(
    {
      url: URL,
      isHTML5: true
    }
  );
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  issueForm: FormGroup;
  severityOptions = [
    {
      name: 'Urgent',
      value: 'Urgent'
    },
    {
      name: 'High',
      value: 'High'
    },
    {
      name: 'Normal',
      value: 'Normal'
    }
  ];
  statusOptions = [
    {
      name: 'Open',
      value: 'Open'
    },
    {
      name: 'In Progress',
      value: 'In Progress'
    },
    {
      name: 'In Review',
      value: 'In Review'
    },
    {
      name: 'Cancelled',
      value: 'Cancelled'
    },
    {
      name: 'Closed',
      value: 'Closed'
    }
  ];
  successFiles = [];
  removedFiles = [];
  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  createForm() {
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: ['', Validators.required],
      severity: ['', Validators.required],
      status: ['Open', Validators.required],
      deadline: '',
      photos: '',
      createdBy: 'Biplob Sarkar',
      created: new Date(),
      modified: new Date()
    });
  }

  addIssue() {
    this.issueForm.value.photos = JSON.stringify(this.successFiles);
    this.issueService.createIssue(this.issueForm.value)
      .subscribe(issue => {
        this.snackbarService.successMessage('Successfully added');
        this.router.navigate(['dashboard', 'issues']);
      }, error => this.snackbarService.errorMessage('Couldn\'t save!'));
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const data = JSON.parse(response); // success server response
    this.successFiles.push(data.filename);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const error = JSON.parse(response); // error server response
    console.log(error);
  }
}

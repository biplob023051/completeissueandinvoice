import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: ['', Validators.required],
      severity: ['', Validators.required],
      status: ['Open', Validators.required],
      deadline: '',
      createdBy: 'Biplob Sarkar',
      created: new Date(),
      modified: new Date()
    });
  }

  addIssue() {
    this.issueService.createIssue(this.issueForm.value)
      .subscribe(issue => {
        this.snackbarService.successMessage('Successfully added');
        this.router.navigate(['dashboard', 'issues']);
      }, error => this.snackbarService.errorMessage('Couldn\'t save!'));
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueListingComponent } from './components/issue-listing/issue-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IssueService } from './services/issue.service';
import { IssueFormComponent } from './components/issue-form/issue-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [IssueListingComponent, IssueFormComponent],
  exports: [IssueListingComponent, IssueFormComponent],
  providers: [IssueService]
})
export class IssuesModule { }

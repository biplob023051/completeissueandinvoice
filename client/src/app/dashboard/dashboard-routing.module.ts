import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/components/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';
import { IssueListingComponent } from '../issues/components/issue-listing/issue-listing.component';
import { IssueFormComponent } from '../issues/components/issue-form/issue-form.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainContentComponent
      },
      {
        path: 'invoices',
        component: InvoiceListingComponent
      },
      {
        path: 'invoices/new',
        component: InvoiceFormComponent
      },
      {
        path: 'invoices/:id',
        component: InvoiceFormComponent
      },
      {
        path: 'clients',
        component: ClientListingComponent
      },
      {
        path: 'issues',
        component: IssueListingComponent
      },
      {
        path: 'issues/new',
        component: IssueFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

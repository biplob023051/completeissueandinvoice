import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';
import { IssuesModule } from '../issues/issues.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InvoicesModule,
    IssuesModule,
    ClientsModule,
    MaterialModule
  ],
  declarations: [DashboardComponent, MainContentComponent, SideNavComponent, ToolbarComponent]
})
export class DashboardModule { }

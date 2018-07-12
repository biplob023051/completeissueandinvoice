import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { remove } from 'lodash';
import { SnackbarService } from '../../../shared/snackbar.service';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css']
})
export class InvoiceListingComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }
  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  ngOnInit() {
    this.invoiceService.getInvoices()
    .subscribe(data => {
      this.dataSource = data;
    }, error => this.snackbarService.errorMessage('Unable to fetch invoices'));
  }

  addInvoice() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }

  deleteInvoice(id) {
    this.invoiceService.deleteInvoice(id)
    .subscribe(invoice => {
      const deletedItems = remove(this.dataSource, (item) => {
        return item._id === invoice._id;
      });
      this.dataSource = [...this.dataSource];
      this.snackbarService.successMessage('Successfully Deleted');
    }, err => this.snackbarService.errorMessage('Unable to delete'));
  }

  editInvoice(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  }

}

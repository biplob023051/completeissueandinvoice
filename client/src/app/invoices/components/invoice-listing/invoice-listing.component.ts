import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css']
})
export class InvoiceListingComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }
  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  ngOnInit() {
    this.invoiceService.getInvoices()
    .subscribe(data => {
      this.dataSource = data;
    }, error => this.errorHandler(error, 'Unable to fetch invoices'));
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
      this.snackBar.open('Successfully Deleted', 'Success', {
        duration: 2000
      });
    }, err => this.errorHandler(err, 'Unable to delete'));
  }

  editInvoice(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  }

  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}

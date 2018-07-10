import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit, OnChanges {
  private invoice;
  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.showEditForm();
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  showEditForm() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }
      this.invoiceService.getInvoice(id)
      .subscribe(invoice => {
        this.invoice = invoice;
        this.invoiceForm.patchValue(this.invoice);
      }, err => this.errorHandler(err, 'Unable to fetch invoice'));
    });
  }

  createForm() {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: '',
      tax: ''
    });
  }

  addInvoice() {
    if (this.invoice) {
      this.invoiceService.updateInvoice(this.invoice._id, this.invoiceForm.value)
       .subscribe(invoice => {
         console.log(invoice);
         this.snackBar.open('Successfully updated', 'Success', {
           duration: 2000
         });
         this.router.navigate(['dashboard', 'invoices']);
       }, err => this.errorHandler(err, 'Update failed'));
    } else {
      this.invoiceForm.value.rate = this.invoiceForm.value.rate ? this.invoiceForm.value.rate : 0;
      this.invoiceForm.value.tax = this.invoiceForm.value.rate ? this.invoiceForm.value.tax : 0;
      this.invoiceService.createInvoice(this.invoiceForm.value)
        .subscribe(invoice => {
          this.rebuildForm();
          this.snackBar.open('Successfully added', 'Success', {
            duration: 2000
          });
          this.router.navigate(['dashboard', 'invoices']);
        }, err => this.errorHandler(err, 'Invoice add failed'));
    }
  }

  rebuildForm() {
    this.invoiceForm.reset();
  }

  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}

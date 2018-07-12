import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }
  public successMessage(message) {
    this.snackBar.open(message, 'Success', {
      duration: 2000
    });
  }

  public errorMessage(message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}

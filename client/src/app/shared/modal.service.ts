import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  public invoke(modalComponent: any, modalSettings: any): Observable<any> {
    const dialogRef = this.dialog.open(modalComponent, modalSettings);
    return dialogRef.afterClosed();
  }
}

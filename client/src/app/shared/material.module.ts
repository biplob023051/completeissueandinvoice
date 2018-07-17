import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule
} from '@angular/material';
const matModules = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule
];
@NgModule({
  imports: [
    CommonModule,
    ...matModules
  ],
  exports: [
    ...matModules
  ],
  declarations: []
})
export class MaterialModule { }

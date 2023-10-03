import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
// import { MatListModule } from '@angular/material/list';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatTableModule } from '@angular/material/table';

const materialModule = [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    //   MatListModule,
    //   MatSnackBarModule,
    //   MatAutocompleteModule,
    //   MatDatepickerModule,
    //   MatTableModule
];

@NgModule({
    imports: [materialModule],
    exports: [materialModule]
})
export class MaterialModule { }

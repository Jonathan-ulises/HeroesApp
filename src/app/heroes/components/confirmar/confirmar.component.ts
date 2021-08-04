import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) { }

  ngOnInit(): void {
    
  }

  borrar() : void {
    //El valor true (puede ser cualquier valor) es el que se envia
    //cuando se subscribe al evento de afterClosed
    this.dialogRef.close(true);
  };

  cerrar() : void {
    this.dialogRef.close();
  };

}

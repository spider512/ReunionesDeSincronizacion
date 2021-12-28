import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-nuevo-problema',
  templateUrl: './nuevo-problema.component.html',
  styleUrls: ['./nuevo-problema.component.css']
})
export class NuevoProblemaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NuevoProblemaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
 ) { }

 
 onNoClick(): void {
  this.dialogRef.close();
}


  ngOnInit(): void {
  }

}

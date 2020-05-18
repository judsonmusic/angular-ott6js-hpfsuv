import { Component, Input, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: "dialog-overview-example",
  templateUrl: "dialog-overview-example.html",
  styleUrls: ["dialog-overview-example.css"]
})
export class DialogOverviewExample implements OnInit {
  myForm: FormGroup;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(null),
      animal: new FormControl(null)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      disableClose: true,
      width: "250px",
      data: this.myForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      // this.myForm.setControl('animal', result);
      this.myForm.controls.animal.setValue(result);
    });
  }
}

//The dialog component. We are using ngValue accessor to get the values.
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html"
})
export class DialogOverviewExampleDialog {
  error: boolean = false;
  animal: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  changeAnimal(ev: any) {
    this.data.animal = ev.target.value;
  }

  save() {
    if (!this.data.animal || this.data.animal == "") {
      this.error = true;
    } else {
      this.dialogRef.close(this.data.animal);
    }
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

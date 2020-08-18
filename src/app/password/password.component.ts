import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.css"],
})
export class PasswordComponent implements OnInit {
  email: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PasswordComponent>
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close(null);
  }
}

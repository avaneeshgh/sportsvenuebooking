import { PasswordComponent } from "./../src/app/password/password.component";
import { UserbookinginfoComponent } from "./../src/app/userbookinginfo/userbookinginfo.component";

import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/confirm-dialog/confirm-dialog.component";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "390px",
      panelClass: "confirm-dialog-container",
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }

  openPasswordDialog() {
    return this.dialog.open(PasswordComponent, {
      width: "390px",
      panelClass: "confirm-dialog-container",
      disableClose: true,
    });
  }

  openUserInfoDialog(presentVenueDetails) {
    return this.dialog.open(UserbookinginfoComponent, {
      width: "650px",
      panelClass: "confirm-dialog-container",
      disableClose: true,
      data: {
        presentVenueDetails: presentVenueDetails,
      },
    });
  }
}

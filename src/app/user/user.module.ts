import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";

import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserEditDetailsComponent } from "./user-edit-details/user-edit-details.component";
import { UserPasswordChangeComponent } from "./user-password-change/user-password-change.component";
import { UserPreviousBookingsComponent } from "./user-previous-bookings/user-previous-bookings.component";

import { TableModule } from "primeng/table";
import { PanelModule } from "primeng/panel";
import { CardModule } from "primeng/card";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";

import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { ErrorComponent } from "../errors/error/error.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "error.interceptor";
import { AuthInterceptor } from "appservices/auth-interceptor";

@NgModule({
  declarations: [
    UserprofileComponent,
    PagenotfoundComponent,
    UserDetailsComponent,
    UserEditDetailsComponent,
    UserPasswordChangeComponent,
    UserPreviousBookingsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    TableModule,
    PanelModule,
    CardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ButtonModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  entryComponents: [ConfirmDialogComponent, ErrorComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class UserModule {}

import { AuthGuard } from "./../../appservices/auth-guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// tslint:disable-next-line: import-spacing
import { OwnerModule } from "./owner/owner.module";
import { UserModule } from "./user/user.module";

import { HomeComponent } from "./home/home.component";
import { FindvenueComponent } from "./findvenue/findvenue.component";
import { TournamentsComponent } from "./tournaments/tournaments.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DisplayComponent } from "./display/display.component";
import { SearchService } from "./search.service";
import { AuthService } from "./auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// imports from angular material
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { PaticularComponent } from "./paticular/paticular.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { PasswordComponent } from "./password/password.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { AuthInterceptor } from "appservices/auth-interceptor";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";

import { UserbookinginfoComponent } from "./userbookinginfo/userbookinginfo.component";
import { AdminViewBookingsComponent } from "./admin/admin-view-bookings/admin-view-bookings.component";
// import { MatSnackBarModule } from "@angular/material/snack-bar";

//primeng
import { TableModule } from "primeng/table";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ErrorComponent } from "./errors/error/error.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { FilterPipe } from "./filter.pipe";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { ErrorInterceptor } from "error.interceptor";
import { SuccessfulbookingComponent } from "./successfulbooking/successfulbooking.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FindvenueComponent,
    TournamentsComponent,
    LoginComponent,
    SignupComponent,
    DisplayComponent,
    PaticularComponent,
    PasswordComponent,
    UserbookinginfoComponent,
    AdminViewBookingsComponent,
    ConfirmDialogComponent,
    ErrorComponent,
    FilterPipe,
    MainNavComponent,
    SuccessfulbookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    OwnerModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    //primeng
    TableModule,
    ProgressSpinnerModule,
    MatFormFieldModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    CheckboxModule,
    ButtonModule,
  ],
  providers: [
    SearchService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserbookinginfoComponent,
    ConfirmDialogComponent,
    ErrorComponent,
    PasswordComponent,
  ],
})
export class AppModule {}

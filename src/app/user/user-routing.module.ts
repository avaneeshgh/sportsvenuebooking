import { UserPreviousBookingsComponent } from "./user-previous-bookings/user-previous-bookings.component";
import { UserPasswordChangeComponent } from "./user-password-change/user-password-change.component";
import { UserEditDetailsComponent } from "./user-edit-details/user-edit-details.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { AuthGuard } from "appservices/auth-guard";

const routes: Routes = [
  {
    path: "user/Userprofile",
    component: UserprofileComponent,
    children: [
      {
        path: "details",
        component: UserDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "edit-details",
        component: UserEditDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "password-change",
        component: UserPasswordChangeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "previous-bookings",
        component: UserPreviousBookingsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: "**", component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class UserRoutingModule {}

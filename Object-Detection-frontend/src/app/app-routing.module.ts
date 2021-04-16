import { VideodetectionComponent } from './videodetection/videodetection.component';
import { DetectiontableComponent } from './detectiontable/detectiontable.component';
import { ObjectdetectorComponent } from './objectdetector/objectdetector.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { PackageComponent } from './package/package.component';
import { DetectedComponent } from './detected/detected.component';
import { UserapiviewComponent } from './userapiview/userapiview.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'upload',
    component:ObjectdetectorComponent
  },
  {
    path:'video-detection',
    component:VideodetectionComponent
  },
  {
    path:'packages/payment',
    component:PaymentComponent
  },
  {
    path:'history',
    component:DetectiontableComponent
  },
  {
    path:'packages',
    component:PackageComponent
  },
  {
    path:'upload/detected',
    component:DetectedComponent
  },
  {
    path:'api/v1/user/object-counter',
    component:UserapiviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

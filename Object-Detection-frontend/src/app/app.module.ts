import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ObjectdetectorComponent } from './objectdetector/objectdetector.component';
import { CategorieselectorComponent } from './categorieselector/categorieselector.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LogoutComponent } from './user/logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DragndropDirective } from './directives/dragndrop.directive';
import { ProductsinventoryComponent } from './user/profile/productsinventory/productsinventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilecountsComponent } from './dashboard/filecounts/filecounts.component';
import { CountanalyticsComponent } from './dashboard/countanalytics/countanalytics.component'
import { NgApexchartsModule } from 'ng-apexcharts';
import { RecentComponent } from './dashboard/recent/recent.component';
import { PaymentComponent } from './payment/payment.component';
import { DetectiontableComponent } from './detectiontable/detectiontable.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PackageComponent } from './package/package.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { DetectedComponent } from './detected/detected.component';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from './state/category.reducer';
import { packageReducer } from './state/payment.reducer';
import { WindowRefService } from './window-ref.service';


@NgModule({
  declarations: [
    AppComponent,
    ObjectdetectorComponent,
    CategorieselectorComponent,
    LoginComponent,
    RegisterComponent,
    ChangepasswordComponent,
    ProfileComponent,
    LogoutComponent,
    NavbarComponent,
    DragndropDirective,
    ProductsinventoryComponent,
    DashboardComponent,
    FilecountsComponent,
    CountanalyticsComponent,
    RecentComponent,
    PaymentComponent,
    DetectiontableComponent,
    PackageComponent,
    SidebarComponent,
    DetectedComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    NgApexchartsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({message:categoryReducer, userPackage:packageReducer}),
  ],
  providers: [ApiService,WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
